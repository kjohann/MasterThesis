window.auction.dialogs = (function (){
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
                    init("#viewBidsDialog", viewBidOptions);
                    window.auction.util.resetViewBidDialog();
                });
            }
        };

    var init = function(id, options) {
         $(id).dialog(options);
    }

    var open = function(id) {
        $(id).dialog("open");
    }

    var close = function(id) {
        $(id).dialog("close");
    }

    var addOption = function(id, optionName, optionValue) {
        $(id).dialog("option", optionName, optionValue);
    }

    //Open dialogs functions

    var openLogin = function() {
        addOption("#loginDialog", "title", "Log in");
        open("#loginDialog");
    }

    var openRegister = function() {
        addOption("#registerDialog", "title", "Register");
        open("#registerDialog");
    }

    var openViewBids = function() {
        addOption("#viewBidsDialog", "title", "You currently have bids on these items");
        open("#viewBidsDialog");
    }

    var openAddItem = function() {
        addOption("#addItemDialog", "title", "Add new item");
        open("#addItemDialog");
    }

    var openPlaceBid = function(itemDOM) {
        window.auction.dialogs.activeItem = itemDOM;
        addOption("#placeBidDialog", "title", "Place bid on item");
        open("#placeBidDialog");
    }

    $(document).ready(function(){
        init("#loginDialog", loginOptions);
        init("#registerDialog", registerOptions);
        init("#addItemDialog", addItemOptions);
        init("#placeBidDialog", placeBidOptions);
        init("#viewBidsDialog", viewBidOptions);
    });

    return {
        close: close,
        openLogin: openLogin,
        openRegister: openRegister,
        openViewBids: openViewBids,
        openAddItem: openAddItem,
        openPlaceBid: openPlaceBid
    }
})();
