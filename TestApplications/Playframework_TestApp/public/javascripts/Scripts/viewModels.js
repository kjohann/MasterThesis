window.auction.viewModels = (function(item, user, socket){ //TODO: does this need parameters?

    var headerViewModel = function(){
        var self = this;

        self.user = ko.observable({});

        self.setUser = function(user){
            self.user(user);
        }

        self.sendLogIn = function(){
            $("#log_in").dialog("close");
            var username = $("#log_usern").val();
            var password = $("#log_pass").val();
            var message = {
                type: "login",
                cid: window.auction.cid,
                username: username,
                password: password
            };
            var json = JSON.stringify(message);
            socket.send(json);
        };

        //TODO: send register info to server
        self.sendRegister = function(){
            //Send to server
            $("#register").dialog("close");
            var usermessage = {
                type: "register",
                cid: window.auction.cid,
                username: $("#username").val(),
                firstname: $("#firstname").val(),
                lastname: $("#lastname").val(),
                adress: $("#adress").val(),
                password: $("#password").val()
            }

            var json = JSON.stringify(usermessage);
            socket.send(json);
        };

        //Dialog handling
        self.log_in_options = {
            autoOpen: false,
            modal: true,
            resizable: false,
            height: 230
        };

        self.register_options = {
            autoOpen: false,
            modal: true,
            resizable: false,
            height: 420
        };

        self.log_in_action = ko.observable();
        self.register_action = ko.observable();

        self.openLogin = function(what){
            self.log_in_action({what: what, random: Math.random()}); //Ugly hack to get the dialog to reopen if closed
        }

        self.openRegister = function(what){
            self.register_action({what: what, random: Math.random()}); //Ugly hack to get the dialog to reopen if closed
        }

        //--end dialog handling
    };

    var itemViewModel = function(){
        var self = this;

        self.items = ko.observableArray();

        self.addItem = function(item){
            self.items.push(item);
        };

        self.sendAddItem = function(){
            var itemname = $("#itemname").val();
            var minprice = parseInt($("#minprice").val());
            var expires = new Date($("#expires").val());
            var description = $("#description").val();

            //TODO: Apply logic for sending to server
            //Send to server

            $("#additem").dialog("close");
        };

        //TODO: Send removeinfo to server
        self.sendRemoveItem = function(itemno){
            //Send to server
        };

        self.removeItem = function(itemno){
            self.items.remove(function(item){
                return item.itemno === itemno;
            });
        };

        //TODO: Send to server
        self.sendPlaceBid = function (){
            var bid = parseInt($("#bid").val());
            //Send to server
            $("#place_bid").dialog("close");
        };

        self.placeBid = function(itemno, bid, username){
            var item = ko.utils.arrayFirst(self.items(), function(i){
                return i.itemno === itemno;
            });

            item.bid(bid);
            item.highestBidder(username);
        };

        //Dialog handling
        self.newItemOptions = {
            autoOpen: false,
            modal: true,
            resizable: false,
            width: 350
        };

        self.newItem = ko.observable();

        self.openNewItem = function(){
            self.newItem({what: "new", random: Math.random()});  //Ugly hack to get the dialog to reopen if closed
        }

        self.selectedItem = ko.observable();

        self.placeBidOptions = {
            autoOpen: false,
            resizable: false,
            modal: true,
            height: 150,
            width: 550
        };

        self.openPlaceBid = function(currentItem){
            self.selectedItem(currentItem);
        };

        self.viewItemsOptions = {
            autoOpen: false,
            modal: true,
            resizable: false,
            width: 400
        };

        self.viewItems = ko.observable();

        self.setViewItems = function(items){
            var biditems = {bidItems: items};
            self.viewItems(biditems);
        }

        //TODO: Get list from server
        self.openItemView = function(){
            //Get from server
        }
        //--end dialog handling


    };
    var headerViewModelObj = new headerViewModel();
    var itemViewModelObj = new itemViewModel();

    var viewModel = {
        headerView: headerViewModelObj,
        itemView: itemViewModelObj
    }
    $(document).ready(function(){
        ko.applyBindings(viewModel);
    });

    return {
        itemViewModel: itemViewModelObj,
        headerViewModel: headerViewModelObj
    };
})(window.auction.models.item, window.auction.models.user, window.auction.socket);
