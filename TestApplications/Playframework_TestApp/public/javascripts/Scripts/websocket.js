(function(item, headerView, itemView, socket){
	socket.onmessage = function (event) {
		var data = JSON.parse(event.data);
		if(data.message === "cid") {
			window.auction.cid = data.cid
		}
	}	
})(window.auction.models.item,
   window.auction.viewModels.headerViewModel,
   window.auction.viewModels.itemViewModel,
   window.auction.socket);