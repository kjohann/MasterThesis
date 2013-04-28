window.auction.messageHandler = (function(){
	var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
	var url = "ws://localhost:9000/wsAuction?id=" + $("#ctxID").val();
	var chatSocket = new WS(url);
	chatSocket.onmessage = function (event) {
		window.auction.cid = JSON.parse(event.data).id		
	}
	
	return {
		
	}
})();