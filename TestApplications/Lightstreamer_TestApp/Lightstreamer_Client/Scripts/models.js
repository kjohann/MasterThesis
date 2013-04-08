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
        }
    }
})();
