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