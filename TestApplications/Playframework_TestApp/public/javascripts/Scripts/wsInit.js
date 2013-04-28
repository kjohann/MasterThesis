window.auction.socket = (function(){
	var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
	var url = "ws://localhost:9000/wsAuction";
	var socket = new WS(url);	
	
	return socket;
})();