(function(root) {
    root.Client = function(clientId, socketObj) {
        var self = this;
        self.clientId = clientId;
        self.socket = socketObj;
        self.messages = [];
        self.master = false;
        self.messagesSent = 0;
        self.completed = false;
    };

    root.Message = function(payload, clientId, messagesSentByClient) {
        var self = this;
        self.sentFromClient = new Date().getTime();
        self.sentFromServer = new Date().getTime(); //Just to init
        self.receivedAtClient = new Date().getTime(); //Just to init
        self.payload = payload;
        self.clientId = clientId;
        self.messageId = clientId + "" + messagesSentByClient;
    };

})(loadTest.models = loadTest.models || {});