(function(root) {
    root.getAverageChartsCombined = function(allChartsArray, spacing, frameworkNames) {
        var frameworks = frameworkNames ? frameworkNames : ["SignalR", "Socket.IO", "Play", "Lightstreamer", "SockJS"];

        var charts = [];
        for(var i = 0; i < frameworks.length; i++) {
            var concat = root.getAverageChartsOfSingleFramework(frameworks[i], allChartsArray, spacing);
            if(concat) {
                charts = charts.concat(concat);
            }
        }

        if(charts.length < 3) return null;

        var receivedAtServerSeriesObj = root.findSeries(charts[0].Series[0].Name, charts);
        var receivedAtServerData = getAverageSeries(receivedAtServerSeriesObj.longest, receivedAtServerSeriesObj.series.map(function(serie) {
            return serie.Data;
        }));

        var sentFromClientsSeriesObj = root.findSeries(charts[0].Series[1].Name, charts);
        var sentFromClientsData = getAverageSeries(sentFromClientsSeriesObj.longest, sentFromClientsSeriesObj.series.map(function(serie){
            return serie.Data;
        }));

        var sentReceivedChart = {
            Title: charts[0].Title,
            XAxis: buildXAxis(sentFromClientsSeriesObj.longest, spacing),
            YAxisTitle: charts[0].YAxisTitle,
            Series: [{
                Name: charts[0].Series[0].Name,
                Data: receivedAtServerData
            }, {
                Name: charts[0].Series[1].Name,
                Data: sentFromClientsData
            }]
        };

        var sentFromServerSeriesObj = root.findSeries(charts[1].Series[0].Name, charts);
        var sentFromServerData = getAverageSeries(sentFromServerSeriesObj.longest, sentFromServerSeriesObj.series.map(function(serie) {
            return serie.Data;
        }));

        var sentFromServerChart = {
            Title: charts[1].Title,
            XAxis: buildXAxis(sentFromServerSeriesObj.longest, spacing),
            YAxisTitle: charts[1].YAxisTitle,
            Series: [{
                Name: charts[1].Series[0].Name,
                Data: sentFromServerData
            }]
        };

        var averageLatencySeriesObj = root.findSeries(charts[2].Series[0].Name, charts);
        var averageLatencyData = getAverageSeries(averageLatencySeriesObj.longest, averageLatencySeriesObj.series.map(function(serie) {
            return serie.Data;
        }));

        var averageLatencyChart = {
            Title: charts[2].Title,
            XAxis: buildXAxis(averageLatencySeriesObj.longest, spacing),
            YAxisTitle: charts[2].YAxisTitle,
            Series: [{
                Name: charts[2].Series[0].Name,
                Data: averageLatencyData
            }]
        };

        return [sentReceivedChart, sentFromServerChart, averageLatencyChart];
    };

    root.getAverageChartsOfSingleFramework = function(framework, allChartsArray, spacing) {
        var frameworkData = root.arrangeData(allChartsArray);

        if(!frameworkData[framework]) return null;

        return [
            root.getAverageSentReceivedChart(frameworkData[framework], spacing),
            root.getAverageSentFromServerChart(frameworkData[framework], spacing),
            root.getAverageLatencyChart(frameworkData[framework], spacing)
        ]
    };

    root.arrangeData = function(allChartsArray) {
        //returns an associative array where each
        // key contains an array of the charts of the framework the key represents
        var arranged = [];
        for(var i = 0; i < allChartsArray.length; i++) {
            var data = allChartsArray[i];
            if(arranged[data.Framework] === undefined) {
                arranged[data.Framework] = [];
            }

            arranged[data.Framework].push(data);
        }

        return arranged;
    };

    root.getCalculatedAveragesOfSeries = function(chartName, seriesName, chartsArray) {
        var longestSeries = 0;
        var charts = root.findCharts(chartName, chartsArray);

        var seriesObj = root.findSeries(seriesName, charts);
        var series = seriesObj.series.map(function(serie) {
            return serie.Data;
        });
        var longestSeries = seriesObj.longest;

        return getAverageSeries(longestSeries, series);
    };

    root.findCharts = function(chartName, chartsArray) {
        var chartsArr = [];
        for(var i = 0; i < chartsArray.length; i++) {
            var charts = chartsArray[i].Charts;
            for(var j = 0; j < charts.length; j++) {
                if(charts[j].Title === chartName) {
                    chartsArr.push(charts[j]);
                }
            }
        }

        return chartsArr;
    };

    root.findSeries = function(seriesName, charts) {
        var longest = 0;
        var seriesArr = [];
        for(var i = 0; i < charts.length; i++) {
            var series = charts[i].Series;
            for(var j = 0; j < series.length; j++) {
                if(series[j].Name === seriesName) {
                    seriesArr.push(series[j]);
                    if(series[j].Data.length > longest) {
                        longest = series[j].Data.length;
                    }
                }
            }
        }

        return {
            series: seriesArr,
            longest: longest
        };
    };

    root.getAverageSentReceivedChart = function(chartsArray, spacing) {
        var chartTitle = "Messages sent from clients and received by server pr. second";
        var yAxisTitle = "Messages";
        var seriesNames = ["Received by server", "Sent from clients"];
        return getAveragesChart(chartTitle, yAxisTitle, chartsArray, seriesNames, spacing);
    };

    root.getAverageSentFromServerChart = function(chartsArray, spacing) {
        var chartTitle = "Messages sent from server pr. second";
        var yAxisTitle = "Messages";
        var seriesNames = ["Messages"];
        return getAveragesChart(chartTitle, yAxisTitle, chartsArray, seriesNames, spacing);
    };

    root.getAverageLatencyChart = function(chartsArray, spacing) {
        var chartTitle = "Average Latency";
        var yAxisTitle = "Average milliseconds";
        var seriesNames = ["Average latency (ms)"];
        return getAveragesChart(chartTitle, yAxisTitle, chartsArray, seriesNames, spacing);
    };

    function getAverageSeries(longestSeries, series) {
        var averageSeries = [];

        for(var j = 0; j < longestSeries; j++) {
            var accumulated = 0;
            var dividend = 0;
            for(var i = 0; i < series.length; i++) {
                var data = series[i];
                var increment = data[j] !== undefined ? data[j] : 0;
                dividend += increment === 0 ? 0 : 1;
                accumulated += increment;

                if(i != series.length - 1) continue;

                var average = accumulated / dividend;
                averageSeries.push(average);
            }
        }

        return averageSeries;
    }

    function getAveragesChart(chartTitle, yAxisTitle, chartsArray, seriesNames, spacing) {
        var chart = {
            Title: chartTitle,
            Series: [],
            YAxisTitle: yAxisTitle
        };

        for(var i = 0; i < seriesNames.length; i++) {
            var series = root.getCalculatedAveragesOfSeries(chart.Title, seriesNames[i], chartsArray);
            chart.Series.push({
                Data: series,
                Name: seriesNames[i]
            });
        }

        chart.XAxis = buildXAxis(chart.Series[0].Data.length, spacing);

        return chart;
    }

    function buildXAxis(length, spacing) {
        var axis = [];

        for(var i = 0; i < length; i++) {
            axis.push((i * spacing).toString());
        }

        return axis;
    }
})(merger);
