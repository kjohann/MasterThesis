window.auction.dialogs = (function (){
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

    return {
        init: init, //TODO: make private
        open: open,
        close: close,
        addOption: addOption,
        openLogin: openLogin,
        openRegister: openRegister,
        openViewBids: openViewBids
    }
})();
