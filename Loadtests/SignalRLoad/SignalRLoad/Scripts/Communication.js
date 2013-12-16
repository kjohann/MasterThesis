(function(options, root, functions, models, dom) {
    options.frameWork = "SignalR";
    var initLock = 0;
    var connectionsTried = 0;
    root.initConnection = function () {
        var clientId = connectionsTried + options.instanceId;
        var connection = $.hubConnection();
        var hubProxy = connection.createHubProxy('loadHub');

        hubProxy.on('initTest', root.initTest);
        hubProxy.on('receiveEcho', functions.receiveEchoMessage);
        hubProxy.on('receiveBroadcast', functions.receiveBroadcastMessage);
        hubProxy.on('harvest', root.harvest);
        hubProxy.on('harvestComplete', functions.harvestComplete);

        options.clients.push(new models.Client(clientId, hubProxy));

        connection.start().done(function() {
            console.log("Connected");
        }).fail(function() {
            console.log("Error connecting");
        });

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
            client.socket.invoke('initTest', test, options.numberOfClientsTotal, options.spacing);
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
            client.socket.invoke('getData', { Messages: messages });
        }).fail(function (error){});
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
            sendMessages(test);
        }, options.messageInterval);        
    }
})(loadTest.options, loadTest.communications = loadTest.communications || {}, loadTest.clientFunctions, loadTest.models, loadTest.dom);