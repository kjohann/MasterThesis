window.auction.model = (function(){
   return {
        item: function(name, itemno, minPrice, bid, expries){
            var self = this;
            self.name = name;
            self.itemno = itemno;
            self.minPrice = minPrice;
            self.bid = bid;

            self.toString = function(){
                alert("Items name: " + self.name);
            };
       }
   };
})();
