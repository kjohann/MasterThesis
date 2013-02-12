window.auction.viewModels = (function(item, user){

    var headerViewModel = function(){
        var self = this;

        self.user = ko.observable();

        self.setUser = function(user){
            self.user(user);
        }

        //TODO: implement theese two
        self.sendLogIn = function(){
            $("#log_in").dialog("close");
        };

        self.sendRegister = function(){
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

        self.removeItem = function(itemno)
        {
            self.items.remove(function(item){
                return item.itemno === itemno;
            });
        };

        //TODO: implement
        self.sendPlaceBid = function (){
            $("#place_bid").dialog("close");
        };

        self.placeBid = function(itemno, bid, user){
            var item = ko.utils.arrayFirst(self.items(), function(i){
                return i.itemno === itemno;
            });

            item.bid(bid);
            item.highestBidder(user.username);
        };

        //Dialog handling
        self.placeBidOptions = {
            autoOpen: false,
            resizable: false,
            modal: true,
            height: 150,
            width: 550
        };

        self.selectedItem = ko.observable();

        self.openPlaceBid = function(currentItem){
            self.selectedItem(currentItem);
        };
        //--end dialog handling


    };
    var headerViewModelObj = new headerViewModel();
    var itemViewModelObj = new itemViewModel();
    $(document).ready(function(){
        ko.applyBindings(headerViewModelObj, document.getElementById("header"));
        ko.applyBindings(itemViewModelObj, document.getElementById("itemViewModelWrapper"));
    });

    return {
        itemViewModel: itemViewModelObj,
        headerViewModel: headerViewModelObj
    };
})(window.auction.models.item, window.auction.models.user);
