define("lsClient", ["LightstreamerClient"], function(LightstreamerClient){
    var lsClient = new LightstreamerClient(null, "AUCTION");
    lsClient.connect();
    return lsClient;
});

if(!window.auction){
    window.auction = {};
}
