var client;

require(["lsClient"], function(lsClient){
   client = lsClient;
});

window.auction.message = (function(dialogs, jsonHandler, item){
    var openAddItem = function() {
        dialogs.addOption("#addItemDialog", "title", "Add new item");
        dialogs.open("#addItemDialog");
    }

    var sendAddItem = function(){
        var itemname = $("#itemname").val();
        var minprice = parseInt($("#minprice").val());
        var expires = $("#expires").val();
        var description = $("#description").val();
        var addedByID = 1; //TODO: need to store logged on user in global object

        var json = jsonHandler.itemToJson(new item(0, minprice, addedByID, itemname, description, expires));
        client.sendMessage(json, "newItem", null, 30000);
        dialogs.close("#addItemDialog");
    }

    $(document).ready(function(){
        var addItemOptions = {
            autoOpen: false,
            modal: true,
            resizable: false,
            width: 350
        };
        dialogs.init("#addItemDialog", addItemOptions);
    });

    return {
        openAddItem: openAddItem,
        sendAddItem: sendAddItem
    };
})(window.auction.dialogs, window.auction.json, window.auction.models.item);
