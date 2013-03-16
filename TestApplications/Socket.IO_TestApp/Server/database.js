var mysql = require('mysql'),
    responses = require('./responses'),
    queryStore = require('./queryStore');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'n5user',
    password: 'n5pass',
    database: 'test'
});

connection.connect();

function verifyLogIn(username, password){
    var q = queryStore.getLogInUserQuery(username, password);
    connection.query(q, function(err, rows, fields){
        if(err)
            console.error("Failed to verifyLogIn with database: verifyLogIn with error code " + err.code);

        var success = rows.length === 1;
        responses.logInResponse(success);

    });
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
