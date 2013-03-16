var database = require('./database')

function verifyLogIn(username, password){
    if(username && password)
        database.verifyLogIn(username, password);
}

function getBidsByUser(userId){
    if(userId)
        database.getBidsByUser(userId);
}

function placeBid(itemno, userId, value){
    if(itemno && userId && value)
        database.placeBid(itemno, userId, value);
}

function registerUser(username, firstname, lastname, adress, password){
    if(username && firstname && lastname && adress && password)
        database.registerUser(username, firstname, lastname, adress, password);
}

function registerItem(name, price, expires, description, addedById){
    if(name && price && expires && description && addedById)
        database.registerItem(name, price, expires, description, addedById)
}

function deleteItem(itemno){
    if(itemno)
        database.deleteItem(itemno);
}

function getAllItems(){
    database.getAllItems();
}

function getLatestBid(bidId){
    if(bidId)
        database.getLatestBid(bidId);
}

function getLatestItem(itemno){
    if(itemno)
        database.getLatestItem((itemno));
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