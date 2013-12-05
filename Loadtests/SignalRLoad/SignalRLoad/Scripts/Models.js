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
        self.SentFromClient = new Date().getTime();
        self.ReceivedAtServer = new Date().getTime(); //Just to init
        self.ReceivedAtClient = new Date().getTime(); //Just to init
        self.Payload = payload;
        self.ClientId = clientId;
        self.MessageId = clientId + "" + messagesSentByClient;
    };

})(loadTest.models = loadTest.models || {});