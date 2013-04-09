var itemFieldList = ["key", "command", "name", "rmID", "price", "bid", "expires", "highestbidder", "description", "addedByID", "bID"];
var userFieldList = ["userId", "username", "itemsJson"]

require(["lsClient", "Subscription", "DynaGrid"], function(lsClient, Subscription, DynaGrid){
    var itemGrid = new DynaGrid("itemWrapper", true);
    itemGrid.setAutoCleanBehavior(true, false);

    var itemSubscription = new Subscription("COMMAND", "items", itemFieldList);
    itemSubscription.addListener({
        onItemUpdate: function(item) {
            if(!window.auction.user.current) {
                return;
            }
            window.auction.util.setRemoveVisibility(window.auction.user.current);
            $(".bidButton").css({"display": "block"});
        }
    });
    itemSubscription.addListener(itemGrid);

    lsClient.subscribe(itemSubscription);
});

window.auction.user = (function(jsonHandler, util){
    var login = function() {
        require(["lsClient", "DynaGrid", "Subscription"], function(lsClient, DynaGrid, Subscription) {
            var userGrid = new DynaGrid("logg_wrap", true);
            userGrid.setAutoCleanBehavior(true, false);
            userGrid.setMaxDynaRows(1);

            var usern = $("#log_usern").val();
            var pass = $("#log_pass").val();

            var userSubscription = new Subscription("DISTINCT", usern, userFieldList);
            userSubscription.addListener({
                onSubscription: function() {
                    var user = {
                        username: usern,
                        password: pass
                    };

                    var json = jsonHandler.userToJson(user);
                    lsClient.sendMessage("LOGIN|"+json,"login", null, 30000);
                    $("#loginDialog").dialog("close");
                },
                onItemUpdate: function(user) {
                    if(user.getValue("userId") == 0) {
                        lsClient.unsubscribe(userSubscription);
                        return;
                    }
                    //use this to update global userobject and update visual
                    $("#log_in_register").css({"display": "none"});
                    $(".logged_in_as_label").css({"display": "block"});
                    $(".bidButton").css({"display": "block"});
                    $("#addItemButton").css({"display": "block"});
                    window.auction.user.current = {
                        username: user.getValue("username"),
                        userId: user.getValue("userId")
                    }
                    util.setRemoveVisibility(window.auction.user.current);
                }
            });

            userSubscription.addListener(userGrid);
            lsClient.subscribe(userSubscription);
        });
    }

    return {
        login: login
    }
})(window.auction.json, window.auction.util);
