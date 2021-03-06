﻿(function(root, options) {
    options.frameWork = "Socket.IO";

    root.SocketInstance = function (transport)  {
        var self = this;
        var socketIO = io.connect('http://localhost:1337', {
            'force new connection': true
        });

        socketIO.on("connect", function() {
            loadTest.log("Connected");
        });

        self.bind = function(functionName, functionToCall) {
            socketIO.on(functionName, functionToCall);
        };

        self.invoke = function() {
            //can receive any number of arguments - to be used according to framework usage
            var args = Array.prototype.slice.call(arguments);
            var emitFunction = args[0];
            args.splice(0, 1);
            socketIO.emit(emitFunction, args);
        };

        self.start = function() {

        };
    };


})(loadTest.socket = loadTest.socket || {}, loadTest.options);