$(window).load(function() {
	$('<iframe id="comet" src="/cometAuction">').appendTo('body');	
});
var messageHandler = window.auction.messageHandler;
var onmessage = messageHandler.handle;
