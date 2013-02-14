window.auction.viewModels = (function(item, user){ //TODO: does this need parameters?

    var headerViewModel = function(){
        var self = this;

        self.user = ko.observable();

        self.setUser = function(user){
            self.user(user);
        }

        //TODO: implement these two
        self.sendLogIn = function(){
            var username = $("#log_usern").val();
            self.setUser(new user(1, username, "Random", "Randomsen", "Randomstreet"));
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

        self.sendAddItem = function(){
            var itemname = $("#itemname").val();
            var minprice = parseInt($("#minprice").val());
            var expires = new Date($("#expires").val());
            var description = $("#description").val();

            //TODO: remove and send to server instead
            var itemno = self.items()[self.items().length - 1].itemno + 1;
            self.addItem(new item(itemname, itemno, minprice, expires, description));

            $("#additem").dialog("close");
        };

        //TODO: need this? Out of scope?
        self.removeItem = function(itemno)
        {
            self.items.remove(function(item){
                return item.itemno === itemno;
            });
        };

        self.sendPlaceBid = function (){

            //TODO: replace with logic for sending to server
            //This shows that the bindings work properly
            var bid = parseInt($("#bid").val()); bid = bid > self.selectedItem().bid() ? bid : self.selectedItem().bid();
            if(bid >= self.selectedItem().minPrice)
                self.placeBid(self.selectedItem().itemno, bid, headerViewModelObj.user())

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

        self.newItem = ko.observable();

        self.openNewItem = function(){
            self.newItem({what: "new", random: Math.random()});  //Ugly hack to get the dialog to reopen if closed
        }

        self.selectedItem = ko.observable();

        self.openPlaceBid = function(currentItem){
            self.selectedItem(currentItem);
        };
        //--end dialog handling


    };
    var headerViewModelObj = new headerViewModel();
    var itemViewModelObj = new itemViewModel();

    var viewModel = {
        headerView: headerViewModelObj,
        itemView: itemViewModelObj
    }
    $(document).ready(function(){
//        ko.applyBindings(headerViewModelObj, document.getElementById("header"));
//        ko.applyBindings(itemViewModelObj, document.getElementById("itemViewModelWrapper"));
        ko.applyBindings(viewModel);
    });

    return {
        itemViewModel: itemViewModelObj,
        headerViewModel: headerViewModelObj
    };
})(window.auction.models.item, window.auction.models.user);
