function item(itemno, name, price, expires, description, addedByID){
    var self = this;
    self.itemno = itemno;
    self.name = name;
    self.price = price;
    self.expires = expires;
    self.description = description;
    self.addedByID = addedByID;
}

function prettyItem(itemno, name, price, expires, description, addedByID, highestBidder, value){
    var self = this;
    self.itemno = itemno;
    self.name = name;
    self.price = price;
    self.expires = expires;
    self.description = description;
    self.addedByID = addedByID;
    self.highestBidderId = highestBidder;
    self.value = value;
}

function user(userID, username, firstname, lastname, adress){
    var self = this;
    self.userID = userID;
    self.username = username;
    self.firstname = firstname;
    self.lastname = lastname;
    self.adress = adress;

}

function bid(bidId, itemno, userId, value, username){
    var self = this;
    self.bidId = bidId;
    self.itemno = itemno;
    self.userId = userId;
    self.value = value;
}

exports.item = item;
exports.prettyItem = prettyItem;
exports.user = user;
exports.bid = bid;
