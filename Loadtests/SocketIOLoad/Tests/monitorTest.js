var monitor = require("../Server/monitor.js").getInstance();
var should = require('chai').should();

describe("monitor", function() {
    beforeEach(function() {
        monitor.reset();
        monitor.startTime = new Date("2014-1-8").getTime();
        monitor.numberOfClients = 100;
    });
    it("reset sets all public fields of the monitor exept startTime back to inital values", function() {
        monitor.completedClients.push("Something");
        monitor.duration = 1000;
        monitor.harvested = 10;
        monitor.numberOfClients = 10;
        monitor.receivedAtServerEvents.push(5);
        monitor.sentFromClientEvents.push(5);
        monitor.sentFromServerEvents.push(25);
        monitor.spacing = 10;
        monitor.testDataEntities.push({latencyData: [10,10]});

        monitor.reset();

        monitor.completedClients.length.should.equal(0);
        monitor.duration.should.equal(0);
        monitor.harvested.should.equal(0);
        monitor.numberOfClients.should.equal(0);
        monitor.receivedAtServerEvents.length.should.equal(0);
        monitor.sentFromClientEvents.length.should.equal(0);
        monitor.sentFromServerEvents.length.should.equal(0);
        monitor.spacing.should.equal(0);
        monitor.testDataEntities.length.should.equal(0);
    });
    it("registerSentFromClientEvent should register an event within the correct interval", function() {
        var values = getDummyMillisecondValues(200, 20);
        registerSentFromClientEvents(values);

        var expectedData = [4, 5, 5, 5, 1];

        monitor.sentFromClientEvents.shouldAllBeEqual(expectedData);
    });
    it("registerSentFromClientEvent should register an event also with different spacing", function() {
        var values = getDummyMillisecondValues(200, 40);
        registerSentFromClientEvents(values, 5);

        var expectedData = [24, 16];

        monitor.sentFromClientEvents.shouldAllBeEqual(expectedData);
    });
    it("registerSentFromClientEvent should be abele to handle large data sets", function() {
        var values = getDummyMillisecondValues(100, 1000);
        registerSentFromClientEvents(values, 10);

        var expectedData = [99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 1];

        monitor.sentFromClientEvents.shouldAllBeEqual(expectedData);
    });
    it("registerSentFromClientEvent should return the corresponding key for the event with spacing one", function() {
        var startLong = monitor.startTime;
        monitor.registerSentFromClientEvent(startLong + 999).should.equal(0);
    });
    it("registerSentFromClientEvent should return the corresponding key for the event with spacing more than one", function() {
        var startLong = monitor.startTime;
        monitor.registerSentFromClientEvent(startLong + 100000, 10).should.equal(10);
    });
    it("registerReceivedAtServerEvent should register an event within the correct interval", function() {
        var values = getDummyMillisecondValues(200, 20);
        registerReceivedAtServerEvents(values);

        var expectedData = [4, 5, 5, 5, 1];

        monitor.receivedAtServerEvents.shouldAllBeEqual(expectedData);
    });
    it("registerReceivedAtServerEvent should register an event also with different spacing", function() {
        var values = getDummyMillisecondValues(200, 40);
        registerReceivedAtServerEvents(values, 5);

        var expectedData = [24, 16];

        monitor.receivedAtServerEvents.shouldAllBeEqual(expectedData);
    });
    it("registerReceivedAtServerEvent should be able to handle large data sets", function() {
        var values = getDummyMillisecondValues(100, 1000);
        registerReceivedAtServerEvents(values, 10);

        var expectedData = [99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 1];

        monitor.receivedAtServerEvents.shouldAllBeEqual(expectedData);
    });
    it("registerSentFromServerEvent should register an echo event within the correct interval", function() {
        var values = getDummyMillisecondValues(200, 20);
        registerSentFromServerEvents(values, false);

        var expectedData = [4, 5, 5, 5, 1];

        monitor.sentFromServerEvents.shouldAllBeEqual(expectedData);
    });
    it("registerSentFromServerEvent should register a broadcast event within the correct interval", function() {
        var values = getDummyMillisecondValues(200, 20);
        registerSentFromServerEvents(values, true);

        var expectedData = [400, 500, 500, 500, 100];

        monitor.sentFromServerEvents.shouldAllBeEqual(expectedData);
    });
    it("registerSentFromServerEvent should register an echo event also with different spacing", function() {
        var values = getDummyMillisecondValues(200, 40);
        registerSentFromServerEvents(values, false, 5);

        var expectedData = [24, 16];

        monitor.sentFromServerEvents.shouldAllBeEqual(expectedData);
    });
    it("registerSentFromServerEvent should register a broadcast event also with different spacing", function() {
        var values = getDummyMillisecondValues(200, 40);
        registerSentFromServerEvents(values, true, 5);

        var expectedData = [2400, 1600];

        monitor.sentFromServerEvents.shouldAllBeEqual(expectedData);
    });
    it("registerSentFromServerEvent should be able to handle large dataSets with echo", function() {
        var values = getDummyMillisecondValues(100, 1000);
        registerSentFromServerEvents(values, false, 10);

        var expectedData = [ 99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 1];

        monitor.sentFromServerEvents.shouldAllBeEqual(expectedData);
    });
    it("registerSentFromServerEvent should be able to handle large dataSets with broadcast", function() {
        var values = getDummyMillisecondValues(100, 1000);
        registerSentFromServerEvents(values, true, 10);

        var expectedData = [ 9900, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 100];

        monitor.sentFromServerEvents.shouldAllBeEqual(expectedData);
    });
    it("addEvent should fill in zero events if key points to an out of bounds index", function() {
        var eventStore = [1,2];
        monitor.addEvent(eventStore, 10);
        var expectedData = [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1];
        eventStore.shouldAllBeEqual(expectedData);
    });
});

function getDummyMillisecondValues(eventInterval, totalNumber) {
    var values = [];
    var startLong = monitor.startTime;

    for (var i = 0; i < totalNumber; i++)
    {
        var value = startLong + eventInterval;
        startLong += eventInterval;
        values.push(value);
    }

    return values;
}

function registerSentFromClientEvents(values, spacing) {
    var sp = spacing ? spacing : 1;

    for(var i = 0; i < values.length; i++) {
        var value = values[i];
        monitor.registerSentFromClientEvent(value, sp);
    }
}

function registerReceivedAtServerEvents(values, spacing) {
    var sp = spacing ? spacing : 1;

    for(var i = 0; i < values.length; i++) {
        var value = values[i];
        monitor.registerReceivedAtServerEvent(value, sp);
    }
}

function registerSentFromServerEvents(values, broadcast, spacing) {
    var sp = spacing ? spacing : 1;

    for(var i = 0; i < values.length; i++) {
        var value = values[i];
        monitor.registerSentFromServerEvent(value, broadcast, sp);
    }
}

Array.prototype.shouldAllBeEqual = function (array2) {
    if(this.length != array2.length) {
        this.length.should.equal(array2.length);
        console.log("Different lengths");
        return;
    }

    for(var i = 0; i < this.length; i++) {
        if(this[i] != array2[i]) {
            console.log("Differ at index: " + i);
        }
        this[i].should.equal(array2[i]);
    }
}
