Users = new Meteor.Collection("users");
Items = new Meteor.Collection("items");

item = function (itemno, name, minPrice, expires, description, addedBy, highestBidder, bid) {
	var self = this;
	self.itemno = itemno;
	self.name = name;
	self.minPrice = minPrice;
	self.expires = expires;
	self.description = description;
	self.addedBy = addedBy;
	self.highestBidder = highestBidder;
	self.bid = bid;
}

user = function (userId, username, firstname, lastname, adress, password) {
	var self = this;
	self.userId = userId;
	self.username = username;
	self.firstname = firstname;
	self.lastname = lastname;
	self.adress = adress;
	self.password = password;
}