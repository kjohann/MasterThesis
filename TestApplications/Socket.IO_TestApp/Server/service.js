var database = require('./database')

function verifyLogIn(username, password){

}

function getBidsByUser(userId){

}

function placeBid(itemno, userId, value){

}

function registerUser(username, firstname, lastname, adress, password){

}

function registerItem(name, price, expires, description){

}

function deleteItem(itemno){

}

function getAllItems(){

}

function getLatestBid(bidId){

}

function getLatestItem(itemno){

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