function getVerifyLogInQuery(username, password){
    var query = 'SELECT * FROM auctionhouse.user ' +
        'WHERE Username = \"' + username + '\"' +
        ' AND Password = \"' + password + '\";';
    return query;
}

function getBidsByUserQuery(userId){
    var query = 'SELECT b.itemno, b.value, i.name ' +
                'FROM auctionhouse.item i ' +
                'INNER JOIN auctionhouse.bid b ' +
                'ON b.itemno = i.itemno ' +
                'INNER JOIN auctionhouse.user u ' +
                'ON b.userID = u.userID ' +
                'INNER JOIN ' +
                '(' +
                'SELECT bid.itemno, MAX(value) AS max ' +
                'FROM auctionhouse.bid ' +
                'GROUP BY bid.itemno ' +
                ') x ' +
                'ON b.itemno = x.itemno AND ' +
                'b.value = x.max ' +
                'WHERE u.userID = \"' + userId + '\" AND b.value != \"' + 0 + '\";';
    return query;
}

function getPlaceBidQuery(itemno, userId, value, username){
    var query = 'INSERT INTO auctionhouse.bid ' +
        '(itemno, userID, value, username) VALUES (\"' + itemno + '\", \"' + userId + '\", \"' + value + '\", \"' + username + '\");';
    return query;
}

function getRegisterUserQuery(username, firstname, lastname, adress, password){
    var query = 'INSERT INTO auctionhouse.user ' +
        '(Username, Firstname, Lastname, Adress, Password) '+
        'VALUES (\"' + username + '\", \"' + firstname + '\", \"' + lastname +
        '\", \"' + adress + '\", \"' + password + '\");';
    return query;
}

function getRegisterItemQuery(name, price, expires, description, addedByID){
    var query = 'INSERT INTO auctionhouse.item (name, price, expires, description, addedByID) ' +
        'VALUES (\"' + name + '\", \"' + price + '\", \"' + expires + '\", \"' + description + '\" , \"' + addedByID +'\");';
    return query;
}

function getDeleteItemQuery(itemno){
    var query = 'DELETE FROM auctionhouse.item ' +
                'WHERE itemno = \"' + itemno + '\";';
    return query;
}

function getAllItemsQuery(){
    var query = 'SELECT u.username as highestbidder, b.itemno, i.name, i.price, UNIX_TIMESTAMP(i.expires) as expiredate, i.description, b.value as bid, i.addedByID ' +
        'FROM auctionhouse.item i ' +
        'INNER JOIN auctionhouse.bid b ' +
        'ON b.itemno = i.itemno ' +
        'INNER JOIN auctionhouse.user u ' +
        'ON b.userID = u.userID ' +
        'INNER JOIN ' +
        '(' +
        'SELECT bid.itemno, MAX(value) AS max ' +
        'FROM auctionhouse.bid ' +
        'GROUP BY bid.itemno ' +
        ') x ' +
        'ON b.itemno = x.itemno AND ' +
        'b.value = x.max';
    return query;
}

function getLatestBidQuery(bidID){
    var query = 'SELECT * FROM auctionhouse.bid WHERE bidID = \"' + bidID + '\";';
    return query;
}

function getLatestItemQuery(itemno, userId, username){ //Also places bid of 0 on the item - ugly hack to prevent too much database traffic
    var query = 'SELECT itemno, name, price, UNIX_TIMESTAMP(expires) as expireDate, description, addedByID ' +
                'FROM auctionhouse.item WHERE itemno = \"' + itemno + '\"; ' +
                'INSERT INTO auctionhouse.bid ' +
                '(itemno, userID, value, username) VALUES (\"' + itemno + '\", \"' + userId + '\", \"' + 0 + '\", \"' + username + '\");';
    return query;
}

exports.getLogInUserQuery = getVerifyLogInQuery;
exports.getBidsByUserQuery = getBidsByUserQuery;
exports.placeBidQuery = getPlaceBidQuery;
exports.registerUserQuery = getRegisterUserQuery;
exports.registerItemQuery = getRegisterItemQuery;
exports.deleteItemQuery = getDeleteItemQuery;
exports.getAllItemsQuery = getAllItemsQuery;
exports.getLatestBidQuery = getLatestBidQuery;
exports.getLatestItemQuery = getLatestItemQuery;

