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
});
