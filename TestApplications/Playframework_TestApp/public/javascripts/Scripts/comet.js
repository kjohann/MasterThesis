$(window).load(function() {
	$('<iframe id="comet" src="/cometAuction">').appendTo('body');	
});
var item = window.auction.models.item;
var headerView = window.auction.viewModels.headerViewModel;
var itemView = window.auction.viewModels.itemViewModel;
var onmessage = function(data) {
	console.log(data);
	if(data.message === "cid") {
		window.auction.cid = data.cid;		
		window.auction.socket.send(JSON.stringify({type: "allItems", cid: data.cid}))
	}
	if(data.message === "login") {
		headerView.setUser(data.user);
	}
	if(data.message === "allItems") {
		var clientItems = data.items.map(function(i) {
            var prettyItem = new item(i.name, i.itemno, i.minPrice, new Date(i.expires), i.description, i.addedByID);
            prettyItem.highestBidder(i.highestBidder);
            prettyItem.bid(i.bid);
            return prettyItem;
        });

        clientItems.forEach(function(item){
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