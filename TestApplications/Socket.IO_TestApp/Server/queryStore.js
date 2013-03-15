function getLogInUser(username, password){
    var query = 'SELECT * FROM auctionhouse.user ' +
        'WHERE Username = \"' + username + '\"' +
        ' AND Password = \"' + password + '\";';
    return query;
}

function getBidsByUser(userId){
    var query = 'SELECT DISTINCT item.itemno, name, price, expires, description, MAX(value) ' +
        'FROM auctionhouse.item ' +
        'INNER JOIN auctionhouse.bid ' +
        'ON auctionhouse.item.itemno = auctionhouse.bid.itemno ' +
        'WHERE userID = \"' + userId + '\" GROUP BY item.itemno;';
    return query;
}

function placeBid(itemno, userId, value){
    var query = 'INSERT INTO auctionhouse.bid ' +
        '(itemno, userID, value) VALUES (\"' + itemno + '\", \"' + userId + '\", \"' + value + '\");';
    return query;
}

function registerUser(username, firstname, lastname, adress, password){
    var query = 'INSERT INTO auctionhouse.user ' +
        '(Username, Firstname, Lastname, Adress, Password) '+
        'VALUES (\"' + username + '\", \"' + firstname + '\", \"' + lastname +
        '\", \"' + adress + '\", \"' + password + '\");';
    return query;
}

function registerItem(name, price, expires, description, addedByID){
    var query = 'INSERT INTO auctionhouse.item (name, price, expires, description, addedByID) ' +
        'VALUES (\"' + name + '\", \"' + price + '\", \"' + expires + '\", \"' + description + '\" , \"' + addedByID +'\");';
    return query;
}

function deleteItem(itemno){
    var query = 'DELETE FROM auctionhouse.bid ' +
        'WHERE itemno = \"' + itemno + '\"; ' +

        'DELETE FROM auctionhouse.item ' +
        'WHERE itemno = \"' + itemno + '\";';
    return query;
}

function getAllItems(){
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

function getLatestBid(bidID){
    var query = 'SELECT * FROM auctionhouse.bid WHERE bidID = \"' + bidID + '\";';
    return query;
}

exports.getLogInUser = getLogInUser;
exports.getBidsByUser = getBidsByUser;
exports.placeBid = placeBid;
exports.registerUser = registerUser;
exports.registerItem = registerItem;
exports.deleteItem = deleteItem;
exports.getAllItems = getAllItems;
exports.getLatestBid = getLatestBid;

