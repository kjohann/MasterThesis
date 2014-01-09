var monitor = require("./monitor.js").getInstance();

exports.initTest = function(testToRun, numberOfClients, spacing, startTime) {
    monitor.reset();
    monitor.numberOfClients= numberOfClients;
    monitor.spacing = spacing;
    monitor.startTime = startTime; //startTime will only be inn milliseconds
}

exports.monitor = monitor;
