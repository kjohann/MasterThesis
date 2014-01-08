var Monitor = function() {
    var self = this;
    self.numberOfClients = 0;
    self.completedClients = [];
    self.duration = 0;
    self.testDataEntities = [];
    self.startTime = 0;
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

var instance = null;

exports.getInstance = function() {
    if(instance) {
        return instance;
    }
    instance = new Monitor();
    return instance;
}

