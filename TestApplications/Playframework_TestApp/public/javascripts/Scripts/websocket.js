(function(item, headerView, itemView, socket){
	socket.onmessage = function (event) { //Overwrite the onmessage function
		var data = JSON.parse(event.data);
		if(data.message === "cid") { //Still need this due to different browser behavior
			window.auction.cid = data.cid
			socket.send(JSON.stringify({type: "allItems", cid: data.cid}));
		}
		if(data.message === "login") {
			headerView.setUser(data.user);
		}
		if(data.message === "allItems") {
			var clientItems = data.items.map(function(i) {
                var expires = new Date(parseInt(i.expires) * 1000); //which one?
                var prettyItem = new item(i.name, i.itemno, i.minPrice, new Date(i.expires), i.description, i.addedByID);
                prettyItem.highestBidder(i.highestBidder);
                prettyItem.bid(i.bid);
                return prettyItem;
            });

            clientItems.forEach(function(item){
                itemView.addItem(item);
            });
		}
	}	
})(window.auction.models.item,
   window.auction.viewModels.headerViewModel,
   window.auction.viewModels.itemViewModel,
   window.auction.socket);