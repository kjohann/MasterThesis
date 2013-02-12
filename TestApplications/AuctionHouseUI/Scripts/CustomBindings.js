//custom binding to initialize a jQuery UI dialog
ko.bindingHandlers.jqDialog = {
    init: function(element, valueAccessor) {
        var options = ko.utils.unwrapObservable(valueAccessor()) || {};

        //handle disposal
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).dialog("destroy");
        });

        $(element).dialog(options);
    }
};

//custom binding handler that opens/closes the dialog
ko.bindingHandlers.openDialog = {
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value) {
            $(element).dialog("option", "title", "Place bid on item: " + value.name + "(itemno: " + value.itemno + ")");
            $("#bid").attr("value", value.bid).attr("min", value.bid);
            $(element).dialog("open");
        } else {
            $(element).dialog("close");
        }
    }
}
