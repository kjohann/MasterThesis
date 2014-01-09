(function(root, options) {
    options.frameWork = null;

    root.SocketInstance = function () {
        var self = this;
        var socketIO = io.connect('http://localhost:1337', {
            'force new connection': true
        });

        console.log("Connection tried - if no errors - prob ok");

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
            //No need with Socket.IO
        };
    };
    

})(loadTest.socket = loadTest.socket || {}, loadTest.options);