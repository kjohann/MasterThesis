(function(item, headerView, itemView, hub) {
    $.extend(hub.auctionHub.client, {
        receiveItem: function (prettyItem) {
            var expires = new Date(prettyItem.expires);
            var i = new item(prettyItem.name, prettyItem.itemno, prettyItem.minPrice, expires, prettyItem.description, prettyItem.addedByID);
            i.highestBidder(prettyItem.highestBidder);
            i.bid(prettyItem.bid);
            itemView.addItem(i);
        }
    });

    $(document).ready(function () {
        $.connection.hub.start().done(function () {
            hub.getAllItems().done(function (items) {
                var clientItems = items.map(function (i) {
                    var prettyItem = new item(i.name, i.itemno, i.price, new Date(i.expires), i.description, i.addedByID);
                    prettyItem.highestBidder(i.highestBidder);
                    prettyItem.bid(i.bid);
                    return prettyItem;
                });

                clientItems.forEach(function (item) {
                    itemView.addItem(item);
                });
            });
        });
    });
})(window.auction.models.item,
   window.auction.viewModels.headerViewModel,
   window.auction.viewModels.itemViewModel,
   window.auction.hub);