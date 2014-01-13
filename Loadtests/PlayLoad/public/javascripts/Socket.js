(function(root, options) {
    options.frameWork = "Play";
    
    function onMessage(response, self) {
		if(response.messageKind === "initTest") {
			self.functions[response.messageKind](response.testToRun);
		} else if(response.messageKind === "receiveMessage") {
			self.functions[response.messageKind](response.data);
		} else if(response.messageKind === "harvest") {
			self.functions[response.messageKind]();
		} else if(response.messageKind === "harvestComplete") {
			self.functions[response.messageKind](response.data);
		} else if(response.messageKind === "cid") {
			self.cid = response.cid;
		}
    }

    root.SocketInstance = function (transport) {
        var self = this;
        self.cid = 0;
        self.functions = [];
        self.commObj;
        
        if(!transport || transport === "websocket") {
            options.transport = "websocket";
        	var WS =  window['MozWebSocket'] ? MozWebSocket : WebSocket;
        	var url = "ws://localhost:9000/wsConnect";
        	self.commObj = new WS(url);
        	self.commObj.onmessage = function(data) {
        		onMessage(JSON.parse(data.data), self);
        	};
        } else {
        	$('<iframe id="comet" src="/comet">').appendTo('body'); 
            self.commObj = {
                send: function(json) {
                    $.ajax({
                        url:"/cmsg",
                        type:"POST",
                        data:json,
                        contentType:"application/json; charset=utf-8",
                        dataType:"json"
                    });
                },
                onmessage: function(data) {

                }
            };
        }

        console.log("Connected");

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
            //no need with Play            
        };
    };

    window.routeMessage = function(data) { //need a global function to route all receiveEvents through
        if(data.messageKind === "cid") {
            onMessage(data, options.clients[options.clients.length - 1].socket);
        } else {
            $.each(options.clients, function(i, client) {
                if(data.cid === client.socket.cid) {
                    onMessage(data, client.socket);
                }
            });
        }
    }        
})(loadTest.socket = loadTest.socket || {}, loadTest.options);