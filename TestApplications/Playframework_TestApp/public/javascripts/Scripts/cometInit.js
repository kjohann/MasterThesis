window.auction.socket = (function(){
	var send = function(json) {
		$.ajax({
  			url:"/cometMessage",
  			type:"POST",
  			data:json,
  			contentType:"application/json; charset=utf-8",
  			dataType:"json",
  			success: function(){
    			//ignore
  			},
  			error: function () {
  				alert("Error posting data!")
  			}
})
	}

	return {
		send: send
	};
})();