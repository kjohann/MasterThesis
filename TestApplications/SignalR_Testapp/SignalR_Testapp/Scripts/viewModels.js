window.auction.viewModels = (function(item, user, hub){

    var headerViewModel = function(){
        var self = this;

        self.user = ko.observable({});

        self.setUser = function(user){
            self.user(user);
        }
   
        self.sendLogIn = function(){
            var username = $("#log_usern").val();
            var password = $("#log_pass").val();
            hub.login(username, password).done(function(user) {
                if(user != null)
                    self.setUser(user);
            });
            $("#log_in").dialog("close");
        };
        self.sendRegister = function(){
            var username = $("#username").val();
            var firstname = $("#firstname").val();
            var lastname = $("#lastname").val();
            var adress = $("#adress").val();
            var password = $("#password").val();
            var regUser = new user(0, username, firstname, lastname, adress, password);
            hub.register(regUser).done(function (success) {
                if (success) {
                    alert("Registered new user! \nTry logging in ;)");
                }
            });
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
            var userID = headerViewModelObj.user().userID;
            var addItem = {
                itemno: 0,
                name: itemname,
                price: minprice,
                expires: expires,
                description: description,
                addedByID: userID
            };
            var username = headerViewModelObj.user().username;
            hub.addItem(addItem, username);            

            $("#additem").dialog("close");
        };

        self.sendRemoveItem = function(itemno){
            hub.deleteItem(itemno);
        };

        self.removeItem = function(itemno){
            self.items.remove(function(item){
                return item.itemno === itemno;
            });
        };

        self.sendPlaceBid = function (){
            var bid = parseInt($("#bid").val());
            var itemno = this.itemno;
            var newbid = {
                itemno: itemno,
                userID: headerViewModelObj.user().userID,
                value: bid,
                username: headerViewModelObj.user().username
            }

            hub.placeBid(newbid);

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

        self.openItemView = function(){
            hub.getUsersBids(headerViewModelObj.user().userID).done(function (bids) {
                itemViewModelObj.setViewItems(bids);
            });
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
})(window.auction.models.item,
   window.auction.models.user,
   window.auction.hub);
