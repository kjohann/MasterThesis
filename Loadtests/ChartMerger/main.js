(function(merger, util) {
    $(function(){
        $("#fileInput").bind("change", function() {
            util.readFileAsJson(this.files[0]).done(function(data) {
                merger.rawData = data;
            }).fail(function(msg) {
                console.log(msg);
            });

        });

        $("#first").click(function() {
            if(!merger.rawData) {
                alert("Select file!");
                return;
            }
            var frameworks = $("#frameworks").val();
            if(!frameworks) {
                alert("Select a framework!");
            }
            var charts = merger.getAverageChartsOfSingleFramework(frameworks[0], merger.rawData, merger.spacing);
            console.log(charts);
        });

        $("#all").click(function() {
            if(!merger.rawData) {
                alert("Select file!");
                return;
            }

            var frameworks = $("#frameworks").val();

            var charts = merger.getAverageChartsCombined(merger.rawData, merger.spacing, frameworks);

            console.log(charts);
        });
    });
})(merger, merger.util);
