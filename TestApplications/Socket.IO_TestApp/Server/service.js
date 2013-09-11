var promise = require("promised-io/promise"),
    models = require('./models.js'),
    database = require("./database.js");

function verifyLogIn(username, password, callback){
    if(username && password) {
        promise.whenPromise(database.verifyLogIn(username, password), function(row){
            var user = new models.user(row.UserID, row.Username, row.Firstname, row.Lastname, row.Adress);
            callback(user, null);
        }, function (error) {
            callback(null, error);
        }, null);
    } else {
        callback(null, "Verification failed: verifyLogIn of " + username + ", " + password);
    }
}

function getBidsByUser(userId, callback){
    if(userId) {
        promise.whenPromise(database.getBidsByUser(userId), function (rows) {
            var bids = rows.map(function(row){
                return new models.viewBid(row.name, row.itemno, row.value);
            });
            callback(bids, null);
        }, function (error) {
            callback(null, error);
        }, null);
    } else {
        callback(null, "GetBids failed: getBidsByUser of " + userId);
    }
}

function placeBid(itemno, userId, value, username, callback){
    if(itemno && userId && value && username) {
        promise.whenPromise(database.placeBid(itemno, userId, value, username), function(data) {
            var bid = new models.bid(0, data.itemno, data.userId, data.value, data.username);
            callback(bid, null);
        }, function (error) {
            callback(null, error);
        }, null);
    } else {
        callback(null, "Placing bid failed: placeBid with " + itemno + ", " + userId + ", " + value + " " + username);
    }
}

function registerUser(username, firstname, lastname, adress, password, callback){
    if(username && firstname && lastname && adress && password) {
        promise.whenPromise(database.registerUser(username, firstname, lastname, adress, password), function () {
            callback(true, null); //always true if this is called
        }, function (error) {
            callback(null, error);
        }, null);
    } else {
        callback("Registration failed: registerUser with " + username + ", " + firstname + ", " + lastname + ", " + adress + ", " + password);
    }
}

function registerItem(name, price, expires, description, addedById, callback){
    if(name && price >= 0 && expires && addedById){
        var descr;
        if(!description){
            descr = "";
        }else{
            descr = description;
        }

        var expiredate = new Date(expires);

        if(isNaN(expiredate)) {
                callback(null, "Error parsing date");
            return;
        }

        var year = expiredate.getFullYear();
        var month = expiredate.getMonth() + 1;
        var day = expiredate.getDate();

        var datestring = year + "-" + month + "-" + day;

        promise.whenPromise(database.registerItem(name, price, datestring, descr, addedById), function (itemno) {
            callback(itemno, null);
        }, function (error) {
            callback(null, error);
        }, null);
    }
    else
        callback(null, "Registration failed: registerItem with " + name + ", " + price + ", " + expires + ", " + description + ", " + addedById);
}

function deleteItem(itemno, callback){
    if(itemno) {
        promise.whenPromise(database.deleteItem(itemno), function() {
            callback(null);
        }, function (error) {
            callback(error);
        }, null);
    } else {
        callback("Failed to delete item: deleteItem with " + itemno);
    }
}

function getAllItems(callback){
    promise.whenPromise(database.getAllItems(), function(rows){
        var items = rows.map(function(row){
            return new models.prettyItem(row.itemno, row.name, row.price, row.expiredate, row.description, row.addedByID, row.highestbidder, row.bid);
        });
        callback(items, null);
    },function (error) {
        callback(null, error);
    }, null);
}

function getLatestItem(itemno, userId, username, callback){
    if(itemno) {
        promise.whenPromise(database.getLatestItem(itemno, userId, username), function (item) {
            var expires = new Date(item.expireDate * 1000);
            var prettyitem = new models.prettyItem(item.itemno, item.name, item.price, expires, item.description, item.addedByID, null, 0);
            callback(prettyitem, null);
        }, function (error) {
            callback(null, error);
        }, null);
    }
    else {
        callback(null, "Failed to get latest: getLatestItem with " + itemno);
    }
}
exports.database = database;
exports.verifyLogIn = verifyLogIn;
exports.getBidsByUser = getBidsByUser;
exports.placeBid = placeBid;
exports.registerUser = registerUser;
exports.registerItem = registerItem;
exports.deleteItem = deleteItem;
exports.getAllItems = getAllItems;
exports.getLatestItem = getLatestItem;