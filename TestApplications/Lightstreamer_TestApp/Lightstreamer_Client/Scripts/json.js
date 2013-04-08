window.auction.json = (function(){
    var formatDateString = function(string) {
        var months = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];
        var dateparts = string.split("-");
        return months[(parseInt(dateparts[1]) - 1)] + " " + dateparts[2] + ", " + dateparts[0];
    }

    var itemToJson = function(jsonItem) {
        if(jsonItem.expires) {
            var expires = formatDateString(jsonItem.expires);
            jsonItem.expires = expires;
        }
        return JSON.stringify(jsonItem);
    }

    var bidToJson = function(jsonBid) {
        return JSON.stringify(jsonBid);
    }

    return {
        itemToJson: itemToJson,
        bidToJson: bidToJson
    }
})();