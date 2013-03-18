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
    //send value of success to
}

function registerItemResponse(itemId){

}

function deleteItemResponse(){

}

function getAllItemsResponse(){

}

function getLatestBidResponse(bid){

}

function getLatestItemResponse(item){

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
