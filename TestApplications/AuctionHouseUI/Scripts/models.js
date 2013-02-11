window.auction.models = (function(){
   return {
        item: function(name, itemno, minPrice, bid, expires, description){
            var self = this;
            self.name = name;
            self.itemno = itemno;
            self.minPrice = minPrice;
            self.bid = bid;
            self.expires = expires.toLocaleDateString();
            self.description = description;
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
