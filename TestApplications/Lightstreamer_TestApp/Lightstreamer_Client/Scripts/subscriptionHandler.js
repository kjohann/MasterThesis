var fieldList = ["key", "command", "name", "rmID", "price", "bid", "expires", "highestbidder", "description", "addedByID", "remVisible"];

require(["lsClient", "Subscription", "DynaGrid"], function(lsClient, Subscription, DynaGrid){
    var itemGrid = new DynaGrid("itemWrapper", true);
    itemGrid.setAutoCleanBehavior(true, false);

    var itemSubscription = new Subscription("COMMAND", "items", fieldList);
    itemSubscription.addListener(itemGrid);

    lsClient.subscribe(itemSubscription);
});
