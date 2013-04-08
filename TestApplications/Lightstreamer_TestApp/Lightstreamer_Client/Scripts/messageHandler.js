var client;

require(["lsClient"], function(lsClient){
   client = lsClient;
});

window.auction.message = (function(dialogs, jsonHandler, item){
    var openAddItem = function() {
        dialogs.addOption("#addItemDialog", "title", "Add new item");
        dialogs.open("#addItemDialog");
    }

    var sendAddItem = function() {
        var itemname = $("#itemname").val();
        var minprice = parseInt($("#minprice").val());
        var expires = $("#expires").val();
        var description = $("#description").val();
        var addedByID = 1; //TODO: need to store logged on user in global object
        var username = "User1"; //TODO: userdata...

        var json = jsonHandler.itemToJson(new item(0, minprice, addedByID, itemname, description, expires, username));
        client.sendMessage("ADD|"+json, "newItem", null, 30000);
        dialogs.close("#addItemDialog");
    }

    var sendDeleteItem = function(itemDOM) {
        var itemno = itemDOM.id.split(".")[1];
        var json = jsonHandler.itemToJson(new item(parseInt(itemno)));
        client.sendMessage("DELETE|"+json, "remItem", null, 30000);
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
        sendAddItem: sendAddItem,
        sendDeleteItem: sendDeleteItem
    };
})(window.auction.dialogs, window.auction.json, window.auction.models.item);
