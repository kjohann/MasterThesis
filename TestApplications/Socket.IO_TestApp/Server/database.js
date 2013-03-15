var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'n5user',
    password: 'n5pass',
    database: 'test'
});

connection.connect();

function verifyLogIn(username, password){

}

function getBidsByUser(userID){

}

function placeBid(itemno, userId, value){

}

function registerUser(username, firstname, lastname, adress, password){

}

function registerItem(name, price, expires, description, addedByID){

}

function deleteItem(itemno){

}

function getAllItems(){

}

function getLatestBid(bidID){

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
