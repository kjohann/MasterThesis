(function(root, options) {
    options.frameWork = null;

    function onMessage(response, self) {
        if(response[0] === "initTest") {
            self.functions[response[0]](response[1]);
        } else if(response[0] === "receiveMessage") {
            self.functions[response[0]](response[1]);
        } else if(response[0] === "harvest") {
            self.functions[response[0]]();
        } else if(response[0] === "harvestComplete") {
            self.functions[response[0]](response[1]);
        }
    }

    root.SocketInstance = function (transport) {
        var self = this;
        self.functions = [];
        self.commObj = new SockJS("http://127.0.0.1:1337/load", null, {protocols_whitelist: [transport]});

        self.commObj.onopen = function() {
            loadTest.log("Connected");
        };
        self.commObj.onmessage = function(e) {
            onMessage(JSON.parse(e.data), self);
        };
        self.commObj.onclose = function() {
            console.log('close');
        };

        self.bind = function(functionName, functionToCall) {
            self.functions[functionName] = functionToCall
        };

        self.invoke = function() {
            //can receive any number of arguments - to be used according to framework usage
            var args = Array.prototype.slice.call(arguments);
            self.commObj.send(JSON.stringify(args));
        };

        self.start = function() {
            //No need
        };
    };
    

})(loadTest.socket = loadTest.socket || {}, loadTest.options);