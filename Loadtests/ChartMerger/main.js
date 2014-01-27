(function(merger, util, chartsHelper) {
    $(function(){
        $("#browserFileInput").bind("change", function() {
            util.readFileAsJson(this.files[0]).done(function(data) {
                merger.rawBrowserData = data;
            }).fail(function(msg) {
                console.log(msg);
            });

        });

        $("#manualFileInput").bind("change", function() {
            util.readFileAsJson(this.files[0]).done(function(data) {
                merger.rawManualData = data;
            }).fail(function(msg) {
                    console.log(msg);
            });
        });

        $("#first").click(function() {
            var frameworks = $("#frameworks").val();
            if(!frameworks) {
                alert("Select a framework!");
                return;
            }

            if(!merger.rawBrowserData) {
                console.log("No browser data file selected");
            } else {
                var charts = merger.getAverageChartsOfSingleFramework(frameworks[0], merger.rawBrowserData, merger.spacing);
                chartsHelper.displayBrowserDataCharts(charts);
            }
            var transports = $("#transports").val();
            if(!merger.rawManualData) {
                console.log("No manual data file selected");
            } else {
                var charts = [];
                charts.push(merger.getManualDataChart("Bytes sent/received", [frameworks[0]], transports, "Bytes", merger.rawManualData));
                charts.push(merger.getManualDataChart("Peak processor usage", [frameworks[0]], transports, "%", merger.rawManualData));
                charts.push(merger.getManualDataChart("Max memory consumtion", [frameworks[0]], transports, "Bytes", merger.rawManualData));

                chartsHelper.displayManualDataChart(charts)
            }
        });

        $("#all").click(function() {
            if(!merger.rawBrowserData) {
                alert("Select file!");
                return;
            }

            var frameworks = $("#frameworks").val();

            var charts = merger.getAverageChartsCombined(merger.rawBrowserData, merger.spacing, frameworks);

            chartsHelper.displayBrowserDataCharts(charts);
        });
    });
})(merger, merger.util, merger.charts);
