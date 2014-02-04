var monitor = require("./monitor.js").getInstance();

exports.initTest = function(testToRun, numberOfClients, spacing, startTime) {
    monitor.reset();
    monitor.numberOfClients= numberOfClients;
    monitor.spacing = spacing;
    monitor.clientStartTime = startTime; //startTime will only be inn milliseconds
    monitor.serverStartTime = new Date().getTime();
}

exports.echo = function(message) {
    registerReceivedAndSentFromClientEvents(message);
    registerSentFromServerEvent(false);
}

exports.broadcast = function(message) {
    registerReceivedAndSentFromClientEvents(message);
    registerSentFromServerEvent(true);
}

exports.complete = function(clientId) {
    monitor.completedClients.push(clientId);

    if(!monitor.complete()) return false;

    monitor.duration = new Date().getTime() - monitor.serverStartTime;
    return true;
}

exports.getData = function(testData, numberOfClientsInBrowser) {
    monitor.testDataEntities.push(testData);
    monitor.harvested += numberOfClientsInBrowser;

    return monitor.harvestedAll();
}

function registerReceivedAndSentFromClientEvents(message) {
    message.ReceivedAtServer = new Date().getTime();
    monitor.registerReceivedAtServerEvent(message.ReceivedAtServer, monitor.spacing);
    var key = monitor.registerSentFromClientEvent(message.SentFromClient, monitor.spacing);
    message.Key = key;
}

function registerSentFromServerEvent(broadcast) {
    var sent = new Date().getTime();
    monitor.registerSentFromServerEvent(sent, broadcast, monitor.spacing);
}

exports.monitor = monitor;
