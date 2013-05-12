window.auction.hub = (function () {
    $.connection.hub.logging = true;
    var auctionHub = $.connection.auctionHub;
    
    var login = function (username, password) {
        return auctionHub.server.login(username, password);
    }

    var getAllItems = function () {
        return auctionHub.server.getAllItems();
    }

    var getUsersBids = function (userID) {
        return auctionHub.server.getUsersBids(parseInt(userID));
    }

    var register = function (user) {
        return auctionHub.server.register(user);
    }

    return {
        auctionHub: auctionHub,
        login: login,
        getAllItems: getAllItems,
        getUsersBids: getUsersBids,
        register: register
    };
    
})();