window.auction.models = (function(){
   return {
        item: function(name, itemno, minPrice, expires, description, addedByID){
            var self = this;
            self.name = name;
            self.itemno = itemno;
            self.minPrice = minPrice;
            self.bid = ko.observable(0);
            self.expires = expires;
            self.description = description;
            self.highestBidder = ko.observable();
            self.addedByID = addedByID;
            self.expireDate = ko.computed(function(){
                return self.expires.toLocaleDateString();
            }, self);
       },

       user: function(userID, username, firstname, lastname, adress){
           var self = this;
           self.userID = userID;
           self.username = username;
           self.firstname = firstname;
           self.lastname = lastname;
           self.adress = adress;
       }
   };
})();
