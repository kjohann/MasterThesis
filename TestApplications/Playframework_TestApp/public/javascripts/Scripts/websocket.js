(function(messageHandler, socket){
	socket.onmessage = function (event) { //Overwrite the onmessage function
		var data = JSON.parse(event.data);
		messageHandler.handle(data);
	}	
})(window.auction.messageHandler, window.auction.socket);