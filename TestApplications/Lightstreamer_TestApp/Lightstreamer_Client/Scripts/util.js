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
         }
     }
})();
