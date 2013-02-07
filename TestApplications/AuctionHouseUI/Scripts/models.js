window.auction.models = (function(){
   return {
        item: function(name, itemno, minPrice, bid, expries){
            var self = this;
            self.name = name;
            self.itemno = itemno;
            self.minPrice = minPrice;
            self.bid = bid;
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
