var should = chai.should();
var wsObj = window.merger.wsOjb;
var lpObj = window.merger.lpObj;
var socketIO = "Socket.IO", signalR = "SignalR", play = "Play", ls = "Lightstreamer";

describe("merger", function() {
    it("getAverageChartsCombine should return null if it does not find at least three charts", function() {
        var allComb = merger.getAverageChartsCombined(lpObj, 1, ["NonExistent"]);

        should.not.exist(allComb);
    })
    it("getAverageChartsCombined should combine all framworkdata into three charts with average data", function() {
        var allComb = merger.getAverageChartsCombined(lpObj, 1);
        var expectedSentReceivedSeries = [50, 50, 30, 50, 20, 20, 30];
        var expectedSentSeries = [1000, 1000, 600, 1000, 400, 400, 600];
        var expectedLatencySeries = [110.10, 96.08, 263.64, 108.50, 108.50, 108.50, 96.08];

        allComb.length.should.equal(3);
        allComb[0].Title.should.equal("Messages sent from clients and received by server pr. second");
        allComb[1].Title.should.equal("Messages sent from server pr. second");
        allComb[2].Title.should.equal("Average Latency");

        allComb[0].Series[0].Data.shouldAllBeEqual(expectedSentReceivedSeries);
        allComb[0].Series[1].Data.shouldAllBeEqual(expectedSentReceivedSeries);
        allComb[1].Series[0].Data.shouldAllBeEqual(expectedSentSeries);
        allComb[2].Series[0].Data.shouldAllBeEqual(expectedLatencySeries);
    });
    it("getAverageChartsOfSingleFramework should return null if the specified framework is not in the data", function() {
        var frameworkAvg = merger.getAverageChartsOfSingleFramework("Socket.1337", lpObj, 1);

        should.not.exist(frameworkAvg);
    });
    it("getAverageChartsOfSingleFramework should return an array containing the average charts of the given framework", function() {
        var frameworkAvg = merger.getAverageChartsOfSingleFramework("Socket.IO", lpObj, 1);
        var expectedSentReceivedSeries = [50, 50, 30, 50, 20, 20, 30];
        var expectedSentSeries = [1000, 1000, 600, 1000, 400, 400, 600];
        var expectedLatencySeries = [110.10, 96.08, 263.64, 108.50, 108.50, 108.50, 96.08];

        frameworkAvg.length.should.equal(3);
        frameworkAvg[0].Title.should.equal("Messages sent from clients and received by server pr. second");
        frameworkAvg[1].Title.should.equal("Messages sent from server pr. second");
        frameworkAvg[2].Title.should.equal("Average Latency");

        frameworkAvg[0].Series[0].Data.shouldAllBeEqual(expectedSentReceivedSeries);
        frameworkAvg[0].Series[1].Data.shouldAllBeEqual(expectedSentReceivedSeries);
        frameworkAvg[1].Series[0].Data.shouldAllBeEqual(expectedSentSeries);
        frameworkAvg[2].Series[0].Data.shouldAllBeEqual(expectedLatencySeries);
    });
    it("arrangeData should return an associative array containing an array for each framework", function() {
        var arr = merger.arrangeData(wsObj);

        arr[socketIO].should.be.an.instanceOf(Array);
        arr[signalR].should.be.an.instanceOf(Array);
        arr[play].should.be.an.instanceOf(Array);
        arr[ls].should.be.an.instanceOf(Array);
    });
    it("arrangeData should place all chart objects of each framework in each entry in the returned array", function() {
        var arr = merger.arrangeData(lpObj);

        arr[socketIO].length.should.equal(4);
        arr[signalR].length.should.equal(1);
        arr[play].length.should.equal(1);
        arr[ls].length.should.equal(1);
    });
    it("getCalculatedAveragesOfSeries should return an array with length equal to the longest series", function() {
        var chartsArray = [wsObj[0], wsObj[1], wsObj[3], wsObj[4]],
            chartName = "Messages sent from clients and received by server pr. second",
            seriesName = "Received by server";
        var series = merger.getCalculatedAveragesOfSeries(chartName, seriesName, chartsArray);

        series.length.should.equal(7);
    });
    it("getCalculatedAveragesOfSeries should return an array with average values", function() {
        var chartsArray = [wsObj[0], wsObj[1], wsObj[3], wsObj[4]],
            chartName = "Messages sent from clients and received by server pr. second",
            seriesName = "Received by server";
        var expected = [100, 100, 60, 100, 40, 40, 60];

        var series = merger.getCalculatedAveragesOfSeries(chartName, seriesName, chartsArray);

        series.shouldAllBeEqual(expected);
    });
    it("findCharts should return all charts with matching title", function() {
        var chartsArray = [wsObj[0], wsObj[1], wsObj[3], wsObj[4]],
            chartName = "Messages sent from clients and received by server pr. second";

        var charts = merger.findCharts(chartName, chartsArray);
        charts.length.should.equal(4);
        charts[0].Title.should.equal(chartName);
    });
    it("findSeries should return all series with matching name", function() {
        var charts = [wsObj[0].Charts[0], wsObj[1].Charts[0], wsObj[3].Charts[0], wsObj[4].Charts[0]];
        var seriesName =  "Received by server";

        var series = merger.findSeries(seriesName, charts);

        series.series.length.should.equal(4);
        series.series[0].Name.should.equal(seriesName);
    });
    it("findSeries should also return the value of the longest series", function() {
        var charts = [wsObj[0].Charts[0], wsObj[1].Charts[0], wsObj[3].Charts[0], wsObj[4].Charts[0]];
        var seriesName =  "Received by server";

        var series = merger.findSeries(seriesName, charts);

        series.longest.should.equal(7);
    });
    it("getAverageSentReceivedChart should return a chart with sent/received series with average values", function() {
        //The values in lpObj/wsObj[4] is equal to all the average values
        var chartsArray = [lpObj[0], lpObj[1], lpObj[3], lpObj[4]];

        var chart = merger.getAverageSentReceivedChart(chartsArray, 1);
        var expected = lpObj[4].Charts[0];
        chart.Title.should.equal(expected.Title);
        chart.XAxis.shouldAllBeEqual(expected.XAxis);
        chart.YAxisTitle.should.equal(expected.YAxisTitle);
        chart.Series[0].Data.shouldAllBeEqual(expected.Series[0].Data);
        chart.Series[1].Data.shouldAllBeEqual(expected.Series[1].Data);
    });
    it("getAverageSentFromServerChart should return a chart with sent from server series with average values", function() {
        var chartsArray = [wsObj[0], wsObj[1], wsObj[3], wsObj[4]];

        var chart = merger.getAverageSentFromServerChart(chartsArray, 1);
        var expected = wsObj[4].Charts[1];
        chart.Title.should.equal(expected.Title);
        chart.XAxis.shouldAllBeEqual(expected.XAxis);
        chart.YAxisTitle.should.equal(expected.YAxisTitle);
        chart.Series[0].Data.shouldAllBeEqual(expected.Series[0].Data);
    });
    //averageCeption :)
    it("getAverageLatencyChart should return a chart with average latency chart with average values", function() {
        var chartsArray = [wsObj[0], wsObj[1], wsObj[3], wsObj[4]];

        var chart = merger.getAverageLatencyChart(chartsArray, 1);
        var expected = wsObj[4].Charts[2];
        chart.Title.should.equal(expected.Title);
        chart.XAxis.shouldAllBeEqual(expected.XAxis);
        chart.YAxisTitle.should.equal(expected.YAxisTitle);
        chart.Series[0].Data.shouldAllBeEqual(expected.Series[0].Data);
    });
});
