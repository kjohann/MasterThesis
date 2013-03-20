window.auction.viewModels = (function(item, user, socket){ //TODO: does this need parameters?

    var headerViewModel = function(){
        var self = this;

        self.user = ko.observable({});

        self.setUser = function(user){
            self.user(user);
        }


        self.sendLogIn = function(){
            socket.emit('logIn', {username: $("#log_usern").val(), password: $("#log_pass").val()});
            $("#log_in").dialog("close");
        };

        self.sendRegister = function(){
            var user = {
                username: $("#username").val(),
                firstname: $("#firstname").val(),
                lastname: $("#lastname").val(),
                adress: $("#adress").val(),
                password: $("#password").val()
            }

            socket.emit('registerUser', user);

            $("#register").dialog("close");
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
            if(!$("#expires").val())
                return;
            var item = {
                name: $("#itemname").val(),
                price: parseInt($("#minprice").val()),
                expires: new Date($("#expires").val()),
                description: $("#description").val(),
                addedByID: viewModel.headerView.user().userID
            }
            var year = item.expires.getFullYear();
            var month = item.expires.getMonth() + 1;
            var day = item.expires.getDate();
            var datestring = year + "-" + month + "-" + day;

            item.expires = datestring;

            socket.emit('registerItem', item);

            $("#additem").dialog("close");
        };

        self.sendRemoveItem = function(itemno){
            socket.emit('deleteItem', itemno);
        };

        self.removeItem = function(itemno){
            self.items.remove(function(item){
                return item.itemno === itemno;
            });
        };

        //TODO: Send to server
        self.sendPlaceBid = function (){
            var bid = parseInt($("#bid").val());
            var itemno = this.itemno;
            var data = {
                itemno: itemno,
                userId: viewModel.headerView.user().userID,
                value: bid,
                username: viewModel.headerView.user().username
            };
            socket.emit("placeBid", data);
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

        //TODO: Get list from server
        self.openItemView = function(){
            //Get from server

            //self.viewItems({bidItems: bidItems}); put in function that receives from server
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
