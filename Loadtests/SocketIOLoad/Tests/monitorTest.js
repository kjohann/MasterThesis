var monitor = require("../Server/monitor.js").getInstance();
var should = require('chai').should();

describe("monitor", function() {
    before(function() {
        monitor.reset();
        monitor.startTime = new Date("2014-1-8");
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

    });
    it("registerSentFromClientEvent should register an event also with different spacing", function() {

    });
    it("registerSentFromClientEvent should be abele to handle large data sets", function() {

    });
    it("registerSentFromClientEvent should return the corresponding key for the event with spacing one", function() {

    });
    it("registerSentFromClientEvent should return the corresponding key for the event with spacing more than one", function() {

    });
    it("registerReceivedAtServerEvent should register an event within the correct interval", function() {

    });
    it("registerReceivedAtServerEvent should register an event also with different spacing", function() {

    });
    it("registerReceivedAtServerEvent should be able to handle large data sets", function() {

    });
    it("registerSentFromServerEvent should register an echo event within the correct interval", function() {

    });
    it("registerSentFromServerEvent should register a broadcast event within the correct interval", function() {

    });
    it("registerSentFromServerEvent should register an echo event also with different spacing", function() {

    });
    it("registerSentFromServerEvent should register a broadcast event also with different spacing", function() {

    });
    it("registerSentFromServerEvent should be able to handle large dataSets with echo", function() {

    });
    it("registerSentFromServerEvent should be able to handle large dataSets with broadcast", function() {

    });
    it("addEvent should fill in zero events if key points to an out of bounds index", function() {

    });
});
