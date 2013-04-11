window.auction.util = (function(){
     return {
         setRemoveVisibility: function(currentUser) {
             var addedByIds = $(".hidden");
             $(".removeButton").each(function(i, obj){
                 var addedById = addedByIds[i].innerHTML;
                 if(addedById == currentUser.userId) {
                     $(obj).css({"display": "block"});
                 } else {
                     $(obj).css({"display": "none"});
                 }
             });
         },
         resetViewBidDialog: function() {
             $("#viewBidsDialog").children().each(function(i){
                 if(this.id != "viewBidWrapper") {
                     $(this).remove();
                 }
             });
         },
         setButtonVisibilityOnNewItem: function(info, domNode) {
             var current = window.auction.user.current;
             if(current){
                 var addedByID = info.getCellValue("addedByID");
                 $(domNode).find(".bidButton").css({"display": "block"});
                 if(addedByID == current.userId); {
                     $(domNode).find(".removeButton").css({"display": "block"});
                 }
             }
         },
         setDisplay: function(selector, display) {
            $(selector).css({"display": ""+display});
         },
         setBidLabelVisibility: function(info, domNode) {
             if(info.getCellValue("bid") == 0) {
                 $(domNode).find(".highBidWrapper").css({"display":"none"});
                 $(domNode).find(".highestBidderWrapper").css({"display":"none"});
             }
             else {
                 $(domNode).find(".highBidWrapper").css({"display":"block"});
                 $(domNode).find(".highestBidderWrapper").css({"display":"block"});
             }
         }
     }
})();
