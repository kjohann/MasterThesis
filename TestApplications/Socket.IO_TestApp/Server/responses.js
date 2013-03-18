var models = require('./models');

function logInResponse(row){
    var user = new models.user(row.userID, row.Username, row.Firstname, row.Lastname, row.Adress, row.Password);
    //send to client
}

function usersBidsResponse(rows){
    var bids = rows.map(function(row){
        return new models.bid(row.bidID, row.itemno, row.userID, row.value);
    });
    //send to client
}

function placeBidResponse(bidId){
    //send id to client
}

function registerUserResponse(success){
    //send to client - no need really, but can show success with an alert
}

function registerItemResponse(itemno){
    //send Id to client - client will then initiate broadcast of new item
}

function deleteItemResponse(itemno){
    //send to clients
}

function getAllItemsResponse(rows){
    var items = rows.map(function(row){
        var expires = new Date(rows.expiredate * 1000);
        return new models.prettyItem(row.itemno, row.name, row.price, expires, row.description, row.addedByID, row.highestbidder, row.bid);
    });
    //send to client
}

function getLatestBidResponse(bid){
    var bid = new models.bid(bid.bidID, bid.itemno, bid.userID, bid.value); //I need username as well don't I?
    //send to clients
}

function getLatestItemResponse(item){
    var expires = new Date(item.expireDate * 1000);
    var item = new models.prettyItem(item.itemno, item.name, item.price, expires, item.description, item.addedByID, null, 0);
    // send to clients
}

exports.logInResponse = logInResponse;
exports.usersBidsResponse = usersBidsResponse;
exports.placeBidResponse = placeBidResponse;
exports.registerUserResponse = registerUserResponse;
exports.registerItemResponse = registerItemResponse;
exports.deleteItemResponse = deleteItemResponse;
exports.getAllItemsResponse = getAllItemsResponse;
exports.getLatestBidResponse = getLatestBidResponse;
exports.getLatestItemResponse = getLatestItemResponse;
