window.auction.socket = (function(){
	var send = function(json) {
		$.ajax({
  			url:"/cometMessage",
  			type:"POST",
  			data:json,
  			contentType:"application/json; charset=utf-8",
  			dataType:"json"
		});
	}

	return {
		send: send
	};
})();