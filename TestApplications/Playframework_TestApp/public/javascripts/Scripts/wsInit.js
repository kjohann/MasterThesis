window.auction.socket = (function(){
	var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
	var url = "ws://localhost:9000/wsAuction";
	var socket = new WS(url);	

	socket.onmessage = function (event) {
		var data = JSON.parse(event.data);
		if(data.message === "cid") {
			window.auction.cid = data.cid
			socket.send(JSON.stringify({type: "allItems", cid: data.cid}));
		}
	}
	
	return socket;
})();