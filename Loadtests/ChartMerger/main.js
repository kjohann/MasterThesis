(function(merger, util) {
    $(function(){
        $("#fileInput").bind("change", function() {
            util.readFileAsJson(this.files[0]).done(function(data) {
                //process and output charts
            }).fail(function(msg) {
                console.log(msg);
            });

        });
    });
})(merger, merger.util);
