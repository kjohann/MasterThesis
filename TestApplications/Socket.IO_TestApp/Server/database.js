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
        if(err){
            console.error("Failed to verifyLogIn with database: verifyLogIn with error code " + err.code);
        }else{

            var success = rows.length === 1;
            if(success){
                responses.logInResponse(rows[0]);
            }else{
                console.error("Failed to verifyLogIn: verifyLogIn returned more that one user - check db");
            }
        }
    });
}

function getBidsByUser(userID){
    var q = queryStore.getBidsByUserQuery(userID);
    connection.query(q, function(err, rows, fields){
        if(err){
            console.error("Failed to get bids from database: getBidsByUser with error code " + err.code);
        }else{
            responses.usersBidsResponse(rows);
        }
    });
}

function placeBid(itemno, userId, value){
    var q = queryStore.placeBidQuery(itemno, userId, value);
    connection.query(q, function(err, result){
        if(err){
            console.error("Failed to place bid in database: placeBid with error code " + err.code);
        }else{
            responses.placeBidResponse(result.insertId);
        }
    });
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
