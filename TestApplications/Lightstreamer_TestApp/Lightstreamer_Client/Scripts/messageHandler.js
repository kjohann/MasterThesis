var client;
var putBid;

require(["lsClient"], function(lsClient){
    client = lsClient;
});

window.auction.message = (function(dialogs, jsonHandler, item, bid){
    var openAddItem = function() {
        dialogs.addOption("#addItemDialog", "title", "Add new item");
        dialogs.open("#addItemDialog");
    }

    var openPlaceBid = function(itemDOM) {
        putBid = itemDOM.id.split(".")[1];
        dialogs.addOption("#placeBidDialog", "title", "Place bid on item");
        dialogs.open("#placeBidDialog");
    }

    var sendAddItem = function() {
        var itemname = $("#itemname").val();
        var minprice = parseInt($("#minprice").val());
        var expires = $("#expires").val();
        var description = $("#description").val();
        var addedByID = window.auction.user.current.userId;
        var username = window.auction.user.current.username;

        var json = jsonHandler.itemToJson(new item(0, minprice, addedByID, itemname, description, expires, username));
        client.sendMessage("ADD|"+json, "newItem", null, 30000);
        dialogs.close("#addItemDialog");
    }

    var sendDeleteItem = function(itemDOM) {
        var itemno = itemDOM.id.split(".")[1];
        var json = jsonHandler.itemToJson(new item(parseInt(itemno)));
        client.sendMessage("DELETE|"+json, "remItem", null, 30000);
    }

    var placeBid = function() {
        var itemno = parseInt(putBid);
        var userId = window.auction.user.current.userId;
        var value = parseInt($("#bid").val());
        var username = window.auction.user.current.username;

        var json = jsonHandler.bidToJson(new bid(0, itemno, userId, value, username));
        client.sendMessage("BID|"+json, "bidItem", null, 30000);
        dialogs.close("#placeBidDialog");
    }

    $(document).ready(function(){
        var loginOptions = {
                autoOpen: false,
                modal: true,
                resizable: false,
                height: 230
            },
            registerOptions = {
                autoOpen: false,
                modal: true,
                resizable: false,
                height: 420
            },
            addItemOptions = {
                autoOpen: false,
                modal: true,
                resizable: false,
                width: 350
            },
            placeBidOptions = {
                autoOpen: false,
                resizable: false,
                modal: true,
                height: 150,
                width: 550
            },
            viewBidOptions = {
                autoOpen: false,
                modal: true,
                resizable: true,
                width: 400,
                close: function(){
                    require(["lsClient", "Subscription"], function(lsClient, Subscription) {
                        var subscribtions = lsClient.getSubscriptions();
                        lsClient.unsubscribe(subscribtions[2]);
                        $("#viewBidsDialog").dialog("destroy");
                        dialogs.init("#viewBidsDialog", viewBidOptions);
                        window.auction.util.resetViewBidDialog();
                    });
                }
            };

        dialogs.init("#loginDialog", loginOptions);
        dialogs.init("#registerDialog", registerOptions);
        dialogs.init("#addItemDialog", addItemOptions);
        dialogs.init("#placeBidDialog", placeBidOptions);
        dialogs.init("#viewBidsDialog", viewBidOptions);
    });

    return {
        openAddItem: openAddItem,
        openPlaceBid: openPlaceBid,
        sendAddItem: sendAddItem,
        sendDeleteItem: sendDeleteItem,
        placeBid: placeBid
    };
})(window.auction.dialogs, window.auction.json, window.auction.models.item, window.auction.models.bid);
