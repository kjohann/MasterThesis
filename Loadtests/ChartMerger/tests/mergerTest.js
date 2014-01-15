var should = chai.should();
var wsObj = window.merger.wsOjb;
var lpObj = window.merger.lpObj;
var socketIO = "Socket.IO", signalR = "SignalR", play = "Play", ls = "Lightstreamer";

describe("merger", function() {
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
});
