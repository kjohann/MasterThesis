(function(loadTest) {
    loadTest.Client = function(clientId, socketObj) {
        var self = this;
        self.clientId = clientId;
        self.socket = socketObj;
        self.messages = [];
        self.master = false;
    };
})(loadTest);