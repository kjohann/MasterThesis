var hub = require("../Server/hub.js");
var should = require('chai').should();
require("./Util/AssertionUtil");
var message;

describe("hub", function() {
    beforeEach(function() {
        hub.monitor.reset();
        hub.monitor.numberOfClients = 100;
        hub.monitor.startTime = new Date("2014-1-8").getTime();
        message = {SentFromClient: hub.monitor.startTime + 50};
        hub.monitor.spacing = 1;
    });
    it("initTest resets monitor", function() {
        hub.monitor.duration = 1337;
        hub.initTest("echo", 1000, 1, 10000000);
        hub.monitor.duration.should.equal(0);
    });
    it("initTest sets number of clients in monitor", function() {
        var nrOfClients = 1000;
        hub.intTest("echo", nrOfClients, 10, 1337);
        hub.monitor.numberOfClients.should.equal(nrOfClients);
    });
    it("initTest sets spacing in monitor", function() {
        var nrOfClients = 1000;
        hub.intTest("echo", nrOfClients, 10, 1337);
        hub.monitor.spacing.should.equal(10);
    });
    it("initTest sets incoming startTime in monitor", function() {
        var nrOfClients = 1000;
        var start = new Date().getTime();
        hub.intTest("echo", nrOfClients, 10, start);
        hub.monitor.startTime.should.equal(start);
    });
    it("echo should set receivedAtServer in message", function() {
        hub.echo(message);
        message.receivedAtServer.should.not.be(0);
    });
    it("echo should register a receivedAtServerEvent in monitor", function() {
        hub.echo(message);
        var expectedData = [1];
        hub.monitor.receivedAtServerEvents.shouldAllBeEqual(expectedData);
    });
    it("echo should register a sentFromClientEvent in monitor", function() {
        hub.echo(message);
        var expectedData = [1];
        hub.monitor.sentFromClientEvents.shouldAllBeEqual(expectedData);
    });
    it("echo should register a sentFromServertEvent in monitor", function() {
        hub.echo(message);
        var expectedData = [1];
        hub.monitor.sentFromServerEvents.shouldAllBeEqual(expectedData);
    });
    it("echo should add key to message", function() {
        message.Key = 1337;  //Will definitely not be this after echo-call
        hub.echo(message);
        message.Key.should.equal(0);
    });
    it("broadcast should set receivedAtServer in message", function() {
        hub.broadcast(message);
        message.receivedAtServer.should.not.equal(0);
    });
    it("broadcast should register a receivedAtServerEvent in monitor", function() {
        hub.broadcast(message);
        var expectedData = [1];
        hub.monitor.receivedAtServerEvents.shouldAllBeEqual(expectedData);
    });
    it("broadcast should register a sentFromClientEvent in monitor", function() {
        hub.broadcast(message);
        var expectedData = [1];
        hub.monitor.sentFromClientEvents.shouldAllBeEqual(expectedData);
    });
    it("broadcast should register sentFromServerEvents corresponding to number of clients in monitor", function() {
        hub.broadcast(message);
        var expectedData = [100];
        hub.monitor.sentFromServerEvents.shouldAllBeEqual(expectedData);
    });
    it("broadcast should add key to message", function() {
        message.Key = 1337
        hub.broadcast(message);
        message.Key.should.equal(0);
    });
    it("complete should add clientId to monitor completed list", function() {
        hub.complete("1337");
        hub.monitor.completedClients.length.should.equal(1);
        hub.monitor.duration.should.equal(0);
    });
    it("complete should set duration in monitor if all clients have completed", function() {
        for(var i = 0; i < hub.monitor.numberOfClients; i++) {
            var now = new Date().getTime();
            while(new Date().getTime() - now < 2) {} //Sleep 2 millis - "hack to get test to set duration above 0

            hub.complete(i);
        }

        hub.monitor.completedClients.length.should.equal(hub.monitor.numberOfClients);
        hub.monitor.duration.should.not.equal(0);
    });
    it("getData should add incoming data to monitor", function() {
        var entity = {LatencyData: [300, 300, 300]};

        hub.getData(entity, 5);

        hub.monitor.testDataEntities[0].LatencyData.shouldAllBeEqual(entity.LatencyData);
    });
    it("getData should increment number of harvested clients in monitor with nrOfClientsInBrowser", function() {
        hub.getData({}, 10);
        hub.monitor.harvested.should.equal(10);
    });
    it("getData should only yield harvestedAll when all clients are harvested", function() {
        hub.monitor.numberOfClients = 15;

        for(var i = 0; i < 3; i++) {
            hub.getData({}, 5);
            hub.monitor.harvestedAll().should.equal(i === 2);
        }
    });
});
