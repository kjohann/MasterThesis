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

    return {
        init: init,
        open: open,
        close: close,
        addOption: addOption
    }
})();
