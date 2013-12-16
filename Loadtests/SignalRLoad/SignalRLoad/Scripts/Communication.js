(function(options, root, functions, models, dom, socket) {
    var initLock = 0;
    var connectionsTried = 0;
    root.initConnection = function () {
        var clientId = connectionsTried + options.instanceId;

        var socketInstance = new socket.SocketInstance();
        socketInstance.bind("initTest", root.initTest);
        socketInstance.bind('receiveEcho', functions.receiveEchoMessage);
        socketInstance.bind('receiveBroadcast', functions.receiveBroadcastMessage);
        socketInstance.bind('harvest', root.harvest);
        socketInstance.bind('harvestComplete', functions.harvestComplete);

        options.clients.push(new models.Client(clientId, socketInstance));
        socketInstance.start();

        if (++connectionsTried < options.numberOfClientsPrBrowser) {
            setTimeout(function () {
                root.initConnection();
            }, options.connectionInterval);
        } else {
            dom.showMasterPromotion();
            dom.hideInit();
        }
    };

    root.start = function(test) {
        functions.findClient(options.masterId).done(function(client) {
            client.socket.invoke(["initTest", test, options.numberOfClientsTotal, options.spacing]);
            dom.changeOnStart();
        }).fail(function(error) {
            console.log(error.message);
        });
    };
    
    root.initTest = function(test) {
        if (initLock++ < 1) { //call only once
            if (test === 'echo' || test === 'broadcast') {
                console.log("Initializing");
                sendMessages(test);
            } else {
                console.error("No such test!");
            }
        }
    }; 

    root.harvest = function(clientId) {
        console.log("Harvesting " + clientId);
        functions.findClient(clientId).done(function (client) {
            var messages = client.messages.length === 0 ? functions.getMessages(client) : client.messages;
            client.socket.invoke(["getData", { Messages: messages }]);
        }).fail(function (error){});
    };
    
    function sendMessages(test) {
        $.each(options.clients, function (index, client) {
            if (client.messagesSent++ < options.numberOfMessages) {
                client.socket.invoke([test, new models.Message("1337", client.clientId, client.messagesSent)]);
            } else if(!client.complete) {
                client.complete = true;
                console.log("Sending complete for client " + client.clientId);
                client.socket.invoke(['complete', client.clientId]);
            }
        });
        
        setTimeout(function () {
            sendMessages(test);
        }, options.messageInterval);        
    }
})(loadTest.options, loadTest.communications = loadTest.communications || {}, loadTest.clientFunctions, loadTest.models, loadTest.dom, loadTest.socket);