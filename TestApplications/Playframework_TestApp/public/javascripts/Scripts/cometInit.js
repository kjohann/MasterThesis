window.auction.socket = (function(){
	var send = function(json) {
		$.post("/cometMessage", json);
	}

	return send;
})();