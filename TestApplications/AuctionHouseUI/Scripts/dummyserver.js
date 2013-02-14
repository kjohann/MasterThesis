(function(user, item, itemViewModel, headerViewModel){
    var descriptions = ["This is a description that is rather short",
        "This is a longer description containing no breakrows at all. It is 500 characters...................This is a longer description containing no breakrows at all. It is 500 characters...................This is a longer description containing no breakrows at all. It is 500 characters...................This is a longer description containing no breakrows at all. It is 500 characters...................This is a longer description containing no breakrows at all. It is 500 characters...................",
        "This is a longer description containing breaks with escapes \r\n This is a longer description contai This is a longer description containing breaks with escapes \r\n This is a longer description contai This is a longer description containing breaks with escapes \r\n This is a longer description contai This is a longer description containing breaks with escapes \r\n This is a longer description contai This is a longer description containing breaks with escapes \r\n This is a longer description contai",
        "This is a longer description containing breaks with br-tags <br/> This is a longer description containing b This is a longer description containing breaks with br-tags <br/> This is a longer description containing b This is a longer description containing breaks with br-tags <br/> This is a longer description containing b This is a longer description containing breaks with br-tags <br/> This is a longer description containing b This is a longer description containing breaks with br-tags <br/> This is a longer description containing b"];

    headerViewModel.setUser(new user(1, "1337User", "Kristian", "Johannessen", "123 Fakestreet"));

    var items = [
        new item("Sykkel", 1, 1000, new Date("5.1.2013"), descriptions[0], 1),
        new item("Bil", 2, 200000, new Date("5.1.2013"), descriptions[1], 2),
        new item("Xbox", 3, 1500, new Date("5.1.2013"), descriptions[2],2),
        new item("TV", 4, 12000, new Date("5.1.2013"), descriptions[3],2),
        new item("Lommebok", 5, 150, new Date("5.1.2013"), descriptions[0],1)
    ];
    var i = 0;
    items.forEach(function(item){
        if(++i % 2 === 0){
            item.highestBidder("1337User");
            item.bid(item.minPrice);
        }
        itemViewModel.addItem(item);
    });

   // itemViewModel.removeItem(2);

    //itemViewModel.placeBid(1, 300, {username: "test"});



})(window.auction.models.user, window.auction.models.item,
window.auction.viewModels.itemViewModel,window.auction.viewModels.headerViewModel);
