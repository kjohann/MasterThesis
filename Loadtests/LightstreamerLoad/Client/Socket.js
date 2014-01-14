(function(root, options) {
    options.frameWork = "Lightstreamer";

    function onMessage(response, self) {
        if(response.messageKind === "initTest") {
            self.functions[response.messageKind](response.testToRun);
        } else if(response.messageKind === "receiveMessage") {
            self.functions[response.messageKind](response.data);
        } else if(response.messageKind === "harvest") {
            self.functions[response.messageKind]();
        } else if(response.messageKind === "harvestComplete") {
            self.functions[response.messageKind](response.data);
        }
    }

    root.SocketInstance = function () {
        var self = this;
        self.functions = [];

        self.commObj = new loadTest.lsUtils.LightstreamerClient(null, "LOAD");
        self.commObj.connect();

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

            self.commObj.sendMessage(JSON.stringify(data))
        };

        self.start = function() {
            self.cid = options.clients[options.clients.length - 1].clientId + "c";
            var DynaGrid = loadTest.lsUtils.DynaGrid;
            var Subscription = loadTest.lsUtils.Subscription;

            var echoGrid = new DynaGrid("echoSource", true);
            echoGrid.setAutoCleanBehavior(true, false);
            echoGrid.setMaxDynaRows(1);

            var broadcastGrid = new DynaGrid("broadCastSource", true);
            broadcastGrid.setAutoCleanBehavior(true, false);
            broadcastGrid.setMaxDynaRows(1);

            var cid = self.cid;

            var echoSub = new Subscription("DISTINCT", cid, ["ejson"]);
            echoSub.addListener({
                onItemUpdate: function(data) {
                    var json = JSON.parse(data.getValue("ejson"));
                    $.each(options.clients, function(i, client) {
                        if(json.cid === client.socket.cid) {
                            onMessage(json, client.socket);
                        }
                    });
                }
            });

            var broadcastSub = new Subscription("DISTINCT", "broadcastJson", ["bjson"]);
            broadcastSub.addListener({
                onItemUpdate: function(data) {
                    var json = JSON.parse(data.getValue("bjson"));
                    $.each(options.clients, function(i, client) {
                        if(json.cid === client.socket.cid) {
                            onMessage(json, client.socket);
                        }
                    });
                }
            });

            echoSub.addListener(echoGrid);
            broadcastSub.addListener(broadcastGrid);

            self.commObj.subscribe(echoSub);
            self.commObj.subscribe(broadcastSub);
        };
    };
    

})(loadTest.socket = loadTest.socket || {}, loadTest.options);
