(function(options, root, functions, models, dom, socket) {    
    root.initConnection = function () {
        var clientId = options.connectionsTried + options.instanceId;

        var socketInstance = new socket.SocketInstance();
        socketInstance.bind("initTest", root.initTest);
        socketInstance.bind("receiveMessage", functions.receiveMessage);
        socketInstance.bind("harvest", root.harvest);
        socketInstance.bind("harvestComplete", functions.harvestComplete);

        options.clients.push(new models.Client(clientId, socketInstance));
        socketInstance.start();

        if (++options.connectionsTried < options.numberOfClientsPrBrowser) {
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
            client.socket.invoke("initTest", test, options.numberOfClientsTotal, options.spacing, new Date().getTime());
            dom.changeOnStart();
        }).fail(function(error) {
            console.log(error.message);
        });
    };
    
    root.initTest = function(test) {
        if (options.locks.initLock++ < 1) { //call only once
            if (test === 'echo' || test === 'broadcast') {
                console.log("Initializing");
                sendMessages(test);
            } else {
                console.error("No such test!");
            }
        }
    }; 

    root.harvest = function() {
        if (options.locks.harvestLock++ < 1) {
            options.locks.allComplete = true;
            var client = options.clients[0];
            console.log("Harvesting...");
            client.socket.invoke("getData", { LatencyData: options.latencyEvents }, options.numberOfClientsPrBrowser);
        }
    };

    function sendMessages(test) {
        $.each(options.clients, function (index, client) {
            if (client.messagesSent++ < options.numberOfMessages) {
                client.socket.invoke(test, new models.Message("1337", client.clientId, client.messagesSent));
            } else if(!client.complete) {
                client.complete = true;
                console.log("Sending complete for client " + client.clientId);
                client.socket.invoke('complete', client.clientId);
            }
        });
        
        setTimeout(function () {
            if (!options.locks.allComplete) {
                sendMessages(test);
            }
        }, options.messageInterval);        
    }
})(loadTest.options, loadTest.communications = loadTest.communications || {}, loadTest.clientFunctions, loadTest.models, loadTest.dom, loadTest.socket);