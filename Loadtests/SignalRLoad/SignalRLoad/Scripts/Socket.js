﻿(function(root, options) {
    options.frameWork = "SignalR";

    root.SocketInstance = function () {
        var self = this;
        self.connection = $.hubConnection();
        self.commObj = self.connection.createHubProxy("loadHub");

        self.bind = function(functionName, functionToCall) {
            self.commObj.on(functionName, functionToCall);
        };

        self.invoke = function() {
            var args = Array.prototype.slice.call(arguments);
            self.commObj.invoke.apply(self.commObj, args);
        };

        self.start = function() {
            self.connection.start().done(function () {
                console.log("Connected");
            }).fail(function () {
                console.log("Error connecting");
            });
        };
    };
    

})(loadTest.socket = loadTest.socket || {}, loadTest.options);