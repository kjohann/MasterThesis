window.auction.models = (function(){
    return {
        item: function(itemno, price, addedByID, name, description, expires, username) {
            var self = this;
            self.itemno = itemno;
            self.price = price;
            self.addedByID = addedByID;
            self.name = name;
            self.description = description;
            self.expires = expires;
            self.username = username;
        },
        bid: function(bidID, itemno, userId, value, username) {
            var self = this;
            self.bidID = bidID;
            self.itemno = itemno;
            self.userId = userId;
            self.value = value;
            self.username = username;
        }
    }
})();
