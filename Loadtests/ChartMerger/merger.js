(function(root) {
    root.getAverageChartsCombined = function(allChartsArray, spacing, frameworkNames) {
        var frameworks = frameworkNames ? frameworkNames : ["SignalR", "Socket.IO", "Play", "Lightstreamer", "SockJS"];

        var sentReceivedCharts = [], sentFromServerCharts = [], averageLatencyCharts = [];
        for(var i = 0; i < frameworks.length; i++) {
            var charts = root.getAverageChartsOfSingleFramework(frameworks[i], allChartsArray, spacing);
            if(charts) {
                var sentRec = charts[0]; sentRec.framework = frameworks[i];
                var sent = charts[1]; sent.framework = frameworks[i];
                var avg = charts[2]; avg.framework = frameworks[i];
                sentReceivedCharts.push(charts[0]);
                sentFromServerCharts.push(charts[1]);
                averageLatencyCharts.push(charts[2]);
            }
        }

        if(sentReceivedCharts.length < 1) return null;

        return [
            getCombinedChart(sentReceivedCharts, spacing),
            getCombinedChart(sentFromServerCharts, spacing),
            getCombinedChart(averageLatencyCharts, spacing)
        ];
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
            if(charts !== undefined) {
                for(var j = 0; j < charts.length; j++) {
                    if(charts[j].Title === chartName) {
                        chartsArr.push(charts[j]);
                    }
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

    root.getAverageManualDataSeries = function(type, frameworks, allDataArray) {

    }

    root.getAverageValueByTypeTransportAndFramework = function(type, transport, framework, allDataArray) {
        for(var i= 0; i < allDataArray.length; i++) {
            var data = allDataArray[i];
            if(data.Type === type && data.Transport == transport && data.Framework === framework) {
                return root.calculateAverageInArray(allDataArray[i].Data);
            }
        }

        return 0;
    }

    root.calculateAverageInArray = function(array) {
        var avg = 0;
        for(var i = 0; i < array.length; i++) {
            avg += array[i];
        }

        return avg / array.length;
    }

    function getCombinedChart(charts, spacing) {
        var chart = {Title: charts[0].Title, YAxisTitle: charts[0].YAxisTitle, Series: []};
        for(var i = 0; i < charts.length; i++) {
            var longestSeries = 0;
            for(var j = 0; j < charts[i].Series.length; j++) {
                chart.Series.push({
                    Name: charts[i].framework + "-" + charts[i].Series[j].Name,
                    Data: charts[i].Series[j].Data
                });

                if(charts[i].Series[j].Data.length > longestSeries) {
                    longestSeries = charts[i].Series[j].Data.length;
                }
            }

            chart.XAxis = buildXAxis(longestSeries, spacing);
        }

        return chart;
    }

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
