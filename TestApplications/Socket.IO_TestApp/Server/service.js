var database = require('./database')

function verifyLogIn(username, password, socket){
    if(username && password)
        database.verifyLogIn(username, password, socket);
    else
        console.error("Verification failed: verifyLogIn of " + username + ", " + password);
}

function getBidsByUser(userId){
    if(userId)
        database.getBidsByUser(userId);
    else
        console.error("GetBids failed: getBidsByUser of " + userId);
}

function placeBid(itemno, userId, value, username){
    if(itemno && userId && value && username)
        database.placeBid(itemno, userId, value, username);
    else
        console.error("Placing bid failed: placeBid with " + itemno + ", " + userId + ", " + value + " " + username);
}

function registerUser(username, firstname, lastname, adress, password, socket){
    if(username && firstname && lastname && adress && password)
        database.registerUser(username, firstname, lastname, adress, password, socket);
    else
        console.error("Registration failed: registerUser with " + username + ", " + firstname + ", " + lastname + ", " + adress + ", " + password);
}

function registerItem(name, price, expires, description, addedById, socket){
    if(name && price && expires && addedById){
        var descr;
        if(!description){
            descr = "";
        }else{
            descr = description;
        }
        database.registerItem(name, price, expires, descr, addedById, socket);
    }
    else
        console.error("Registration failed: registerItem with " + name + ", " + price + ", " + expires + ", " + description + ", " + addedById);
}

function deleteItem(itemno){
    if(itemno)
        database.deleteItem(itemno);
    else
        console.error("Failed to delete item: deleteItem with " + itemno);
}

function getAllItems(socket){
    database.getAllItems(socket);
}

function getLatestBid(bidId){
    if(bidId)
        database.getLatestBid(bidId);
    else
        console.error("Failed to get latest: getLatestBid with " + bidId);
}

function getLatestItem(itemno, userId, username, socket){
    if(itemno)
        database.getLatestItem(itemno, userId, username, socket);
    else
        console.error("Failed to get latest: getLatestItem with " + itemno);
}

exports.verifyLogIn = verifyLogIn;
exports.getBidsByUser = getBidsByUser;
exports.placeBid = placeBid;
exports.registerUser = registerUser;
exports.registerItem = registerItem;
exports.deleteItem = deleteItem;
exports.getAllItems = getAllItems;
exports.getLatestBid = getLatestBid;
exports.getLatestItem = getLatestItem;