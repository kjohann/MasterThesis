var mysql = require('mysql'),
    responses = require('./responses'),
    queryStore = require('./queryStore');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'n5user',
    password: 'n5pass',
    database: 'auctionhouse',
    multipleStatements: true //For the sake of testapp, this is ok...
});

connection.connect();

function verifyLogIn(username, password, socket){
    var q = queryStore.getLogInUserQuery(username, password);
    connection.query(q, function(err, rows, fields){
        if(err){
            console.error("Failed to verifyLogIn with database: verifyLogIn with error code " + err.code);
        }else{

            var success = rows.length === 1;
            if(success){
                responses.logInResponse(rows[0], socket);
            }else if(rows.length > 1){
                console.error("Failed to verifyLogIn: verifyLogIn returned more that one user - check db");
            }else{
                console.error("Failed to verifyLogin: verifyLogIn with " + username + ", " + password);
            }
        }
    });
}

function getBidsByUser(userID, socket){
    var q = queryStore.getBidsByUserQuery(userID);
    connection.query(q, function(err, rows, fields){
        if(err){
            console.error("Failed to get bids from database: getBidsByUser with error code " + err.code);
        }else{
            responses.usersBidsResponse(rows, socket);
        }
    });
}

function placeBid(itemno, userId, value, username, socket){
    var q = queryStore.placeBidQuery(itemno, userId, value, username);
    connection.query(q, function(err, result){
        if(err){
            console.error("Failed to place bid in database: placeBid with error code " + err.code);
        }else{
            responses.placeBidResponse(itemno, userId, value, username, socket);
        }
    });
}

function registerUser(username, firstname, lastname, adress, password, socket){
    var q = queryStore.registerUserQuery(username, firstname, lastname, adress, password);
    connection.query(q, function(err, result){
        if(err){
            console.error("Failed to register user in database: registerUser with error code " + err.code);
        }else{
            responses.registerUserResponse(true, socket);
        }
    });
}

function registerItem(name, price, expires, description, addedByID, socket){  //Assume expires to be a formatted string: dd-MM-yyyy
    var q = queryStore.registerItemQuery(name, price, expires,description, addedByID);
    connection.query(q, function(err, result){
        if(err){
            console.error("Failed to register item in database: registerItem with error code " + err.code);
        }else{
            responses.registerItemResponse(result.insertId, socket);
        }
    });
}

function deleteItem(itemno, socket){
    var q = queryStore.deleteItemQuery(itemno);
    connection.query(q, function(err, result){
        if(err){
            console.error("Failed to delete item from database: deleteItem with error code " + err.code);
        }else{
            responses.deleteItemResponse(itemno, socket); //Not sure if this works, but crude testing indicates that it does..
        }
    });
}

function getAllItems(socket){
    var q = queryStore.getAllItemsQuery();
    connection.query(q, function(err, rows, fields){
        if(err){
            console.error("Failed to get items at inital load from database: getALlItems with error code " + err.code);
        }else{
            responses.getAllItemsResponse(rows, socket);
        }
    });
}

function getLatestBid(bidID){
    var q = queryStore.getLatestBidQuery(bidID);
    connection.query(q, function(err, rows, fields){
        if(err){
            console.error("Failed to get latest bid: getLatestBid with error code " + err.code);
        }else if(rows.length > 1){
            console.error("Database may be corrupt: getLatestBid returned more than one row!");
        }else{
            responses.getLatestBidResponse(rows[0]);
        }
    });
}

function getLatestItem(itemno, userId, username, socket){
    var q = queryStore.getLatestItemQuery(itemno, userId, username);
    connection.query(q, function(err, result){
        if(err){
            console.error("Failed to get latest item: getLatestItem with error code " + err.code);
        }else if(result[0].length > 1){
            console.error("Database may be corrupt: getLatestItem returned more than one row!");
        }else{
            responses.getLatestItemResponse((result[0])[0], socket);
        }
    });
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
