(function(root, options) {
    options.frameWork = "Play";
    
    function onMessage(json, self) {
    	var response = JSON.parse(json);
		if(response.messageKind === "initTest") {
			self.functions[response.messageKind](response.testToRun);
		} else if(response.messageKind === "receiveMessage") {
			self.functions[response.messageKind](response.data);
		} else if(response.messageKind === "harvest") {
			self.functions[response.messageKind]();
		} else if(response.messageKind === "harvestComplete") {
			self.functions[response.messageKind]();
		} else if(response.messageKind === "cid") {
			self.cid = response.cid;
		}
    }

    root.SocketInstance = function (transport) {
        var self = this;
        self.cid = 0;
        self.functions = [];
        self.commObj;
        
        if(!transport) {
        	var WS =  window['MozWebSocket'] ? MozWebSocket : WebSocket;
        	var url = "ws://localhost:9000/wsConnect";
        	self.commObj = new WS(url);
        	self.commObj.onmessage = function(data) {
        		onMessage(data.data, self);
        	};
        } else {
        	//comet
        }

        self.bind = function(functionName, functionToCall) {
            self.functions[functionName] = functionToCall  
        };

        self.invoke = function() {
            var args = Array.prototype.slice.call(arguments);
            var data = {
            	messageKind: args[0],
            	cid: self.cid
            };
            args.splice(0,1);
            data.data = args;
            self.commObj.send(JSON.stringify(data));
        };

        self.start = function() {
            //may not need to do any work depending on the framework
        };
    };
    

})(loadTest.socket = loadTest.socket || {}, loadTest.options);