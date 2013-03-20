(function(headerView, itemView, socket){
    $(document).ready(function(){
        socket.on('logInResponse', function(user){
            headerView.setUser(user);
        })
    })


})(window.auction.viewModels.headerViewModel,
   window.auction.viewModels.itemViewModel,
   window.auction.socket);
