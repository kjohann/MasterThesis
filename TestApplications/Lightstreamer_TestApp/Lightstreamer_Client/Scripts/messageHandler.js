var client;

require(["lsClient"], function(lsClient){
    client = lsClient;
});

window.auction.message = (function(dialogs, jsonHandler, item, bid){
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
        var activeItem = window.auction.dialogs.activeItem;
        var itemno = parseInt(activeItem.id.split(".")[1]);
        var userId = window.auction.user.current.userId;
        var value = parseInt($("#bid").val());
        var username = window.auction.user.current.username;

        var json = jsonHandler.bidToJson(new bid(0, itemno, userId, value, username));
        client.sendMessage("BID|"+json, "bidItem", null, 30000);
        dialogs.close("#placeBidDialog");
    }

    var sendLogin = function(usern, pass) {
        var user = {
            username: usern,
            password: pass
        };

        var json = jsonHandler.userToJson(user);
        client.sendMessage("LOGIN|"+json,"login", null, 30000);
        dialogs.close("#loginDialog");
    }

    var sendRegister = function() {
        var user = {
            username: $("#username").val(),
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            adress: $("#adress").val(),
            password: $("#password").val()
        }

        var json = jsonHandler.userToJson(user);
        client.sendMessage("REG|"+json,"login", null, 30000);
        dialogs.close("#registerDialog");
    }

    return {
        sendAddItem: sendAddItem,
        sendDeleteItem: sendDeleteItem,
        placeBid: placeBid,
        sendLogin: sendLogin,
        sendRegister: sendRegister
    };
})(window.auction.dialogs, window.auction.json, window.auction.models.item, window.auction.models.bid);
