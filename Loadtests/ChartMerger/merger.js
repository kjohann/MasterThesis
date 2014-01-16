(function(root) {
    root.getAverageChartsCombined = function(allChartsArray, spacing, frameworkNames) {
        var frameworks = frameworkNames ? frameworkNames : ["SignalR", "Socket.IO", "Play", "Lightstreamer", "SockJS"];

        var sentReceivedCharts = [], sentFromServerCharts = [], averageLatencyCharts = [];
        for(var i = 0; i < frameworks.length; i++) {
            var charts = root.getAverageChartsOfSingleFramework(frameworks[i], allChartsArray, spacing);
            if(charts) {
                sentReceivedCharts.push(charts[0]);
                sentFromServerCharts.push(charts[1]);
                averageLatencyCharts.push(charts[2]);
            }
        }

        if(sentReceivedCharts.length < 1) return null;

        var receivedAtServerSeriesObj = root.findSeries(sentReceivedCharts[0].Series[0].Name, sentReceivedCharts);
        var sentFromClientSeriesObj = root.findSeries(sentReceivedCharts[0].Series[1].Name, sentReceivedCharts);
        var sentReceivedChart = sentReceivedCharts[0];
        sentReceivedChart.XAxis = buildXAxis(receivedAtServerSeriesObj.longest, spacing);
        sentReceivedChart.Series[0].Data = getAverageSeries(receivedAtServerSeriesObj.longest,
            receivedAtServerSeriesObj.series.map(function(serie) {return serie.Data;}));
        sentReceivedChart.Series[1].Data = getAverageSeries(sentFromClientSeriesObj.longest,
            sentFromClientSeriesObj.series.map(function(serie) {return serie.Data;}));

        var sentFromServerSeriesObj = root.findSeries(sentFromServerCharts[0].Series[0].Name, sentFromServerCharts);
        var sentFromServerChart = sentFromServerCharts[0];
        sentFromServerChart.XAxis = buildXAxis(sentFromServerSeriesObj.longest, spacing);
        sentFromServerChart.Series[0].Data = getAverageSeries(sentFromServerSeriesObj.longest,
            sentFromServerSeriesObj.series.map(function(serie) {return serie.Data;}));

        var averageLatencySeriesObj = root.findSeries(averageLatencyCharts[0].Series[0].Name, averageLatencyCharts);
        var averageLatencyChart = averageLatencyCharts[0];
        averageLatencyChart.XAxis = buildXAxis(averageLatencySeriesObj.longest, spacing);
        averageLatencyChart.Series[0].Data = getAverageSeries(averageLatencySeriesObj.longest,
            averageLatencySeriesObj.series.map(function(serie) {return serie.Data;}));

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
