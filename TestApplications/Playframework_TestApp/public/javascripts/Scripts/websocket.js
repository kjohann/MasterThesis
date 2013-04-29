(function(item, headerView, itemView, socket){
	socket.onmessage = function (event) { //Overwrite the onmessage function
		var data = JSON.parse(event.data);
		if(data.message === "cid") { //Still need this due to different browser behavior
			window.auction.cid = data.cid
		}
		if(data.message === "login") {
			headerView.setUser(data.user);
		}
	}	
})(window.auction.models.item,
   window.auction.viewModels.headerViewModel,
   window.auction.viewModels.itemViewModel,
   window.auction.socket);