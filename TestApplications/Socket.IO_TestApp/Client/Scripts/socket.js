(function(item, headerView, itemView, socket){
    $(document).ready(function(){
        socket.emit('getAllItems');

        socket.on('allItems', function(items){
            var clientItems = items.map(function(i){
                var expires = new Date(parseInt(i.expires) * 1000);
                var prettyItem = new item(i.name, i.itemno, i.minPrice, new Date(i.expires), i.description, i.addedByID);
                prettyItem.highestBidder(i.highestBidder);
                prettyItem.bid(i.bid);
                return prettyItem;
            });

            clientItems.forEach(function(item){
                itemView.addItem(item);
            });
        });

        socket.on('logInResponse', function(user){
            headerView.setUser(user);
        });

        socket.on('registerUserResponse', function(success){
            if(success){
                alert("Registered new user! \nTry logging in ;)");
            }
        });

        socket.on('registerItemResponse', function(itemno){
            var data = {};
            data.itemno = itemno; data.userId = headerView.user().userID; data.username = headerView.user().username;
            socket.emit('getLatestItem', data);
        });

        socket.on('latestItemResponse', function(prettyItem){
            var expires = new Date(prettyItem.expires);
            var i = new item(prettyItem.name, prettyItem.itemno, prettyItem.minPrice, expires, prettyItem.description, prettyItem.addedByID);
            i.highestBidder(prettyItem.highestBidder);
            i.bid(prettyItem.bid);
            itemView.addItem(i);
        });

        socket.on('deleteItemResponse', function(itemno){
            itemView.removeItem(itemno);
        });

        socket.on('placeBidResponse', function(bid){
            itemView.placeBid(bid.itemno, bid.value, bid.username);
        });

        socket.on('usersBidsResponse', function(bids){
            itemView.setViewItems(bids);
        });
    });


})(window.auction.models.item,
   window.auction.viewModels.headerViewModel,
   window.auction.viewModels.itemViewModel,
   window.auction.socket);
