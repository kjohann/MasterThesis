var mysql = require('mysql'),
    queryStore = require('./queryStore'),
    promise = require('promised-io/promise');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'n5user',
    password: 'n5pass',
    database: 'auctionhouse',
    multipleStatements: true //For the sake of testapp, this is ok...
});

connection.connect();

function verifyLogIn(username, password){
    var q = queryStore.getLogInUserQuery(username, password),
        deferred = new promise.Deferred();
    connection.query(q, function(err, rows, fields){
        if(err){
            deferred.reject("Failed to verifyLogIn with database: verifyLogIn with error code " + err.code);
        }else{
            rows.length === 1 ? deferred.resolve(rows[0])
                              : rows.length > 1 ? deferred._reject("Failed to verifyLogIn: verifyLogIn returned more that one user - check db")
                              : deferred.reject("Failed to verifyLogin: verifyLogIn with " + username + ", " + password);
        }
    });
    return deferred.promise;
}

function getBidsByUser(userID){
    var q = queryStore.getBidsByUserQuery(userID),
        deferred = new promise.Deferred();
    connection.query(q, function(err, rows, fields){
        if(err){
            deferred.reject("Failed to get bids from database: getBidsByUser with error code " + err.code);
        }else{
            deferred.resolve(rows);
        }
    });
    return deferred.promise;
}

function placeBid(itemno, userId, value, username){
    var q = queryStore.placeBidQuery(itemno, userId, value, username),
        deferred = new promise.Deferred();
    connection.query(q, function(err, result){
        if(err){
            deferred.reject("Failed to place bid in database: placeBid with error code " + err.code);
        }else{
            deferred.resolve({
                itemno: itemno,
                userId: userId,
                value: value,
                username: username
            });
        }
    });
    return deferred.promise;
}

function registerUser(username, firstname, lastname, adress, password){
    var q = queryStore.registerUserQuery(username, firstname, lastname, adress, password),
        deferred = new promise.Deferred();
    connection.query(q, function(err, result){
        if(err){
            deferred.reject("Failed to register user in database: registerUser with error code " + err.code);
        }else{
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function registerItem(name, price, expires, description, addedByID){  //Assume expires to be a formatted string: dd-MM-yyyy
    var q = queryStore.registerItemQuery(name, price, expires,description, addedByID),
        deferred = new promise.Deferred();
    connection.query(q, function(err, result){
        if(err){
            deferred.reject("Failed to register item in database: registerItem with error code " + err.code);
        }else{
            deferred.resolve(result.insertId);
        }
    });
    return deferred.promise;
}

function deleteItem(itemno){
    var q = queryStore.deleteItemQuery(itemno),
        deferred = new promise.Deferred();
    connection.query(q, function(err, result){
        if(err){
            deferred.reject("Failed to delete item from database: deleteItem with error code " + err.code);
        }else{
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function getAllItems(){
    var q = queryStore.getAllItemsQuery(),
    deferred = new promise.Deferred();
    connection.query(q, function(err, rows, fields){
        if(err){
            deferred.reject("Failed to get items at initial load from database: getALlItems with error code " + err.code);
        }else{
            deferred.resolve(rows);
        }
    });
    return deferred.promise;
}

function getLatestItem(itemno, userId, username){
    var q = queryStore.getLatestItemQuery(itemno, userId, username),
        deferred = new promise.Deferred();
    connection.query(q, function(err, result){
        if(err){
            deferred.reject("Failed to get latest item: getLatestItem with error code " + err.code);
        }else if(result[0].length > 1){
            deferred.reject("Database may be corrupt: getLatestItem returned more than one row!");
        }else{
            deferred.resolve((result[0])[0]);
        }
    });
    return deferred.promise;
}

exports.verifyLogIn = verifyLogIn;
exports.getBidsByUser = getBidsByUser;
exports.placeBid = placeBid;
exports.registerUser = registerUser;
exports.registerItem = registerItem;
exports.deleteItem = deleteItem;
exports.getAllItems = getAllItems;
exports.getLatestItem = getLatestItem;
