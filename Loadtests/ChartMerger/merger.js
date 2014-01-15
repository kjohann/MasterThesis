(function(root) {
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
        var chart = {
            Title: "Messages sent from clients and received by server pr. second",
            XAxis: [],
            Series: [],
            YAxisTitle: "Messages"
        };

        var firstSeries = "Received by server", secondSeries = "Sent from clients";

        var receivedSeries = root.getCalculatedAveragesOfSeries(chart.Title, firstSeries, chartsArray);
        var sentSeries = root.getCalculatedAveragesOfSeries(chart.Title, secondSeries, chartsArray);

        chart.XAxis = buildXAxis(receivedSeries.length, spacing);

        chart.Series.push({
            Data: receivedSeries,
            Name: firstSeries
        });

        chart.Series.push({
            Data: sentSeries,
            Name: secondSeries
        });

        return chart;
    };

    root.getAverageSentFromServerChart = function(chartsArray, spacing) {
        var chart = {
            Title: "Messages sent from server pr. second",
            XAxis: [],
            Series: [],
            YAxisTitle: "Messages"
        };

        var series = root.getCalculatedAveragesOfSeries(chart.Title, "Messages", chartsArray);

        chart.XAxis = buildXAxis(series.length, spacing);

        chart.Series.push({
            Data: series,
            Name: "Messages"
        });

        return chart;
    };

    function buildXAxis(length, spacing) {
        var axis = [];

        for(var i = 0; i < length; i++) {
            axis.push((i * spacing).toString());
        }

        return axis;
    }
})(merger);
