(function(root, options) {
    options.frameWork = "Lightstreamer";

    root.SocketInstance = function () {
        var self = this;



        self.bind = function(functionName, functionToCall) {
            //Binds the function with name functionName to functionToCall  
        };

        self.invoke = function() {
            //can receive any number of arguments - to be used according to framework usage
            var args = Array.prototype.slice.call(arguments);

        };

        self.start = function() {
            //may not need to do any work depending on the framework
        };
    };
    

})(loadTest.socket = loadTest.socket || {}, loadTest.options);