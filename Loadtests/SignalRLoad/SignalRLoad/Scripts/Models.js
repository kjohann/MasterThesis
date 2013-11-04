(function(loadTest) {
    loadTest.client = function(clientId, socket) {
        var self = this;
        self.clientId = clientId;
        self.socket = socket;
        self.messages = [];
        self.master = false;
    };
})(loadTest);