var itemFieldList = ["key", "command", "name", "rmID", "price", "bid", "expires", "highestbidder", "description", "addedByID", "bID"];
var userFieldList = ["userId", "username", "itemsJson"];
var viewBidsList = ["key", "command", "viewName", "viewItemno", "viewBid"];

(function(util){
    require(["lsClient", "Subscription", "DynaGrid"], function(lsClient, Subscription, DynaGrid){
        var itemGrid = new DynaGrid("itemWrapper", true);
        itemGrid.setAutoCleanBehavior(true, false);
        itemGrid.addListener({
            onVisualUpdate: function(key, info, domNode) {
                util.setButtonVisibilityOnNewItem(info, domNode);
            }
        });

        var itemSubscription = new Subscription("COMMAND", "items", itemFieldList);
        itemSubscription.addListener(itemGrid);

        lsClient.subscribe(itemSubscription);
    });
})(window.auction.util);

window.auction.user = (function(jsonHandler, util, message, dialogs){
    var login = function() {
        require(["lsClient", "DynaGrid", "Subscription"], function(lsClient, DynaGrid, Subscription) {
            var userGrid = new DynaGrid("logg_wrap", true);
            userGrid.setAutoCleanBehavior(true, false);
            userGrid.setMaxDynaRows(1);
            userGrid.addListener({
               onVisualUpdate: function(key, info, domNode) {
                   if(info.getCellValue("userId") == 0) {
                       $(domNode).empty();
                   }
                   else {
                       util.setDisplay(domNode, "block");
                   }
               }
            });

            var usern = $("#log_usern").val();
            var pass = $("#log_pass").val();

            var userSubscription = new Subscription("DISTINCT", usern, userFieldList);
            userSubscription.addListener({
                onSubscription: function() {
                    message.sendLogin(usern, pass);
                },
                onItemUpdate: function(user) {
                    if(user.getValue("userId") == 0) {
                        lsClient.unsubscribe(userSubscription);
                        return;
                    }
                    //use this to update global userobject and update visual
                    util.setDisplay("#log_in_register", "none");
                    util.setDisplay(".logged_in_as_label", "block");
                    util.setDisplay(".bidButton", "block");
                    util.setDisplay("#addItemButton", "block");
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

    var getViewBids = function() {
        require(["lsClient", "DynaGrid", "Subscription"], function(lsClient, DynaGrid, Subscription) {
            var viewBidGrid = new DynaGrid("viewBidWrapper", true);
            viewBidGrid.setAutoCleanBehavior(true, false);
            viewBidGrid.addListener({
                onVisualUpdate: function(key, info, domNode) {
                    util.setDisplay(domNode, "block");
                }
            });
            var bidUser = {
                username: window.auction.user.current.username,
                userID: parseInt(window.auction.user.current.userId)
            };
            var viewBidsSubscription = new Subscription("COMMAND", "b|" + bidUser.userID + "|" + jsonHandler.userToJson(bidUser), viewBidsList);
            viewBidsSubscription.addListener(viewBidGrid);

            lsClient.subscribe(viewBidsSubscription);
            dialogs.openViewBids();
        });
    }

    return {
        login: login,
        getViewBids: getViewBids
    }
})(window.auction.json, window.auction.util, window.auction.message, window.auction.dialogs);
