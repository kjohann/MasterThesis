var Monitor = function() {
    var self = this;
    self.numberOfClients = 0;
    self.completedClients = [];
    self.duration = 0;
    self.testDataEntities = [];
    self.clientStartTime = 0;
    self.serverStartTime = 0;
    self.spacing = 0;
    self.harvested = 0;
    self.sentFromClientEvents = [];
    self.receivedAtServerEvents = [];
    self.sentFromServerEvents = [];
};

Monitor.prototype.reset = function() {
    var self = this;
    self.numberOfClients = 0;
    self.completedClients = [];
    self.duration = 0;
    self.testDataEntities = [];
    self.spacing = 0;
    self.harvested = 0;
    self.sentFromClientEvents = [];
    self.receivedAtServerEvents = [];
    self.sentFromServerEvents = [];
}

Monitor.prototype.registerSentFromClientEvent = function(millisecondsSinceEpoch, spacing) {
    var sp = spacing ? spacing : 1;
    var key = getKey(millisecondsSinceEpoch, sp, this, true);
    this.addEvent(this.sentFromClientEvents, key);
    return key;
}

Monitor.prototype.registerReceivedAtServerEvent = function(millisecondsSinceEpoch, spacing) {
    var sp = spacing ? spacing : 1;
    var key = getKey(millisecondsSinceEpoch, sp, this, false);
    this.addEvent(this.receivedAtServerEvents, key);
}

Monitor.prototype.registerSentFromServerEvent = function(millisecondsSinceEpoch, broadCast, spacing) {
    var sp = spacing ? spacing : 1;
    var key = getKey(millisecondsSinceEpoch, sp, this, false);
    var nrOfEvents = broadCast ? this.numberOfClients : 1;
    this.addEvent(this.sentFromServerEvents, key, nrOfEvents);
}

Monitor.prototype.addEvent = function (eventStore, key, numberOfEvents) {
    var nrOE = numberOfEvents ? numberOfEvents : 1;

    while(key > eventStore.length) {
        eventStore.push(0);
    }
    if(eventStore.length === key) {
        eventStore.push(nrOE);
    } else {
        eventStore[key] += nrOE;
    }
}

Monitor.prototype.complete = function() {
    return this.completedClients.length === this.numberOfClients;
}

Monitor.prototype.harvestedAll = function() {
    return this.harvested === this.numberOfClients;
}

function getKey(millisecondsSinceEpoch, spacing, monitor, client) {
    var start = client ? monitor.clientStartTime : monitor.serverStartTime;
    var millisecondsSinceStart = millisecondsSinceEpoch - start;
    var seconds = round(false, millisecondsSinceStart / 1000);
    return round(false, seconds / spacing);
}

function round(up, value) {
    return up ? Math.ceil(value) : Math.floor(value);
}

var instance = null;

exports.getInstance = function() {
    if(instance) {
        return instance;
    }
    instance = new Monitor();
    return instance;
}

