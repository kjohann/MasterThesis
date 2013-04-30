window.auction.messageHandler = (function(item, headerView, itemView, socket){
	return {
		handle: function (data) {
			if(data.message === "cid") {
				window.auction.cid = data.cid;		
				socket.send(JSON.stringify({type: "allItems", cid: data.cid}))
			}
			if(data.message === "login") {
				headerView.setUser(data.user);
			}
			if(data.message === "allItems") {
				var clientItems = $.map(data.items,function(i) {
		            var prettyItem = new item(i.name, i.itemno, i.minPrice, new Date(i.expires), i.description, i.addedByID);
		            prettyItem.highestBidder(i.highestBidder);
		            prettyItem.bid(i.bid);
		            return prettyItem;
		        });

		        $.each(clientItems, function(i, item){
		            itemView.addItem(item);
		        });
			}
			if(data.message === "register") {
				if(data.success) {
					alert("Registered new user! \nTry logging in ;)");
				} else {
					alert("Error registering!");
				}
			}
			if(data.message === "addItem") {
				var prettyItem = data.item;
				var expires = new Date(prettyItem.expires);
		        var i = new item(prettyItem.name, prettyItem.itemno, prettyItem.minPrice, expires, prettyItem.description, prettyItem.addedByID);
		        i.highestBidder(prettyItem.highestBidder);
		        i.bid(prettyItem.bid);
		        itemView.addItem(i);
			}
			if(data.message === "removeItem") {
				itemView.removeItem(data.itemno);
			}
			if(data.message === "placeBid") {
				itemView.placeBid(data.itemno, data.value, data.username);
			}
			if(data.message === "viewBids") {
				itemView.setViewItems(data.bids);
			}				
		}
	}
})(window.auction.models.item,
   window.auction.viewModels.headerViewModel,
   window.auction.viewModels.itemViewModel,
   window.auction.socket);