$(window).load(function() {
	$('<iframe id="comet" src="/cometAuction">').appendTo('body');	
});

var onmessage = function(data) {
	console.log(data);
	if(data.message === "cid") {
		window.auction.cid = data.cid;
		var url = "/cometMessage/test"
		$.post(url,  function (data) {
			alert("Done!");
		})
		//window.auction.socket.send("Hei!")
	}
}