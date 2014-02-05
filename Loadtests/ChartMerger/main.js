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
            var frameworks = $("#frameworks").val() ? $("#frameworks").val() : util.getDefaultFrameworks();

            if(!merger.rawBrowserData) {
                console.log("No browser data file selected");
            } else {
                var charts = merger.getAverageChartsOfSingleFramework(frameworks[0], merger.rawBrowserData, merger.spacing);
                chartsHelper.displayBrowserDataCharts(charts);
            }

            var transports = $("#transports").val() ? $("#transports").val() : util.getDefaultTransports();

            if(!merger.rawManualData) {
                console.log("No manual data file selected");
            } else {
                var charts = [];
                charts.push(merger.getManualDataChart("Bytes sent/received", [frameworks[0]], transports, "Bytes", merger.rawManualData));
                charts.push(merger.getManualDataChart("Peak processor usage", [frameworks[0]], transports, "%", merger.rawManualData));
                charts.push(merger.getManualDataChart("Max memory consumtion", [frameworks[0]], transports, "KBytes", merger.rawManualData));

                chartsHelper.displayManualDataChart(charts)
            }
        });

        $("#all").click(function() {
            var frameworks = $("#frameworks").val() ? $("#frameworks").val() : util.getDefaultFrameworks();
            var transports = $("#transports").val() ? $("#transports").val() : util.getDefaultTransports();

            if(!merger.rawBrowserData) {
                console.log("No browser data file selected");
            } else {
                var charts = merger.getAverageChartsCombined(merger.rawBrowserData, merger.spacing, frameworks);
                chartsHelper.displayBrowserDataCharts(charts);
            }

            if(!merger.rawManualData) {
                console.log("No manual data file selected");
            } else {
                var charts = [];
                charts.push(merger.getManualDataChart("Bytes sent/received", frameworks, transports, "Bytes", merger.rawManualData));
                charts.push(merger.getManualDataChart("Peak processor usage", frameworks, transports, "%", merger.rawManualData));
                charts.push(merger.getManualDataChart("Max memory consumtion", frameworks, transports, "KBytes", merger.rawManualData));

                chartsHelper.displayManualDataChart(charts)
            }
        });
    });
})(merger, merger.util, merger.charts);
