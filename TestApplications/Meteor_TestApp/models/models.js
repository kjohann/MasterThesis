auctionItem = function (name, minPrice, expires, description, addedBy, highestBidder, bid) {
	var self = this;
	self.name = name;
	self.minPrice = minPrice;
	self.expires = expires;
	self.description = description;
	self.addedBy = addedBy;
	self.highestBidder = highestBidder;
	self.bid = bid;
}

user = function (username, firstname, lastname, adress, password) {
	var self = this;
	self.username = username;
	self.firstname = firstname;
	self.lastname = lastname;
	self.adress = adress;
	self.password = password;
}