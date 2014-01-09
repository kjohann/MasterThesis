var monitor = require("./monitor.js").getInstance();

exports.initTest = function(testToRun, numberOfClients, spacing, startTime) {
    monitor.reset();
    monitor.numberOfClients= numberOfClients;
    monitor.spacing = spacing;
    monitor.startTime = startTime; //startTime will only be inn milliseconds
}

exports.echo = function(message) {
    registerReceivedAndSentFromClientEvents(message);
    registerSentFromServerEvent(false);
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
