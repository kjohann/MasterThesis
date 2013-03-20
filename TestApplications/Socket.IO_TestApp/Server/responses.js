var models = require('./models');

function logInResponse(row, socket){
    var user = new models.user(row.UserID, row.Username, row.Firstname, row.Lastname, row.Adress);
    socket.emit('logInResponse', user);
}

function usersBidsResponse(rows, socket){
    var bids = rows.map(function(row){
        return new models.viewBid(row.name, row.itemno, row.value);
    });

    socket.emit('usersBidsResponse', bids);
}

function placeBidResponse(itemno, userId, value, username, socket){
    var bid = new models.bid(0, itemno, userId, value, username);
    socket.emit('placeBidResponse', bid);
}

function registerUserResponse(success, socket){
    socket.emit('registerUserResponse', success);
}

function registerItemResponse(itemno, socket){
    socket.emit('registerItemResponse', itemno);
}

function deleteItemResponse(itemno, socket){
    socket.emit('deleteItemResponse', itemno);
}

function getAllItemsResponse(rows, socket){
    var items = rows.map(function(row){
        return new models.prettyItem(row.itemno, row.name, row.price, row.expiredate, row.description, row.addedByID, row.highestbidder, row.bid);
    });
    socket.emit('allItems', items);
}

function getLatestBidResponse(bid){
    var bid = new models.bid(bid.bidID, bid.itemno, bid.userID, bid.value, bid.username); //I need username as well don't I?
    //send to clients
}

function getLatestItemResponse(item, socket){
    var expires = new Date(item.expireDate * 1000);
    var prettyitem = new models.prettyItem(item.itemno, item.name, item.price, expires, item.description, item.addedByID, null, 0);
    socket.emit('latestItemResponse', prettyitem);
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
