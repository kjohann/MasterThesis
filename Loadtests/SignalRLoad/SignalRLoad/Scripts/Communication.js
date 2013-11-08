﻿(function(options, root, functions, models, dom) {
    options.frameWork = "SignalR";
    var initLock = 0;
    root.initConnection = function () {
        for (var i = 0; i < options.numberOfClientsPrBrowser; i++) {
            var clientId = i + options.instanceId;
            var connection = $.hubConnection();
            var hubProxy = connection.createHubProxy('loadHub');

            hubProxy.on('initTest', root.initTest);
            hubProxy.on('receiveEcho', functions.receiveMessage);
            hubProxy.on('receiveBroadcast', functions.receiveMessage);
            hubProxy.on('harvest', root.harvest);
            hubProxy.on('harvestComplete', functions.harvestComplete);

            options.clients.push(new models.Client(clientId, hubProxy));

            connection.start().done(function() {
                console.log("Connected");
            }).fail(function() {
                console.log("Error connecting");
            });
        }
    };

    root.start = function(test) {
        functions.findClient(options.masterId).done(function(client) {
            var testDuration = options.numberOfMessages * options.messageInterval;
            client.socket.invoke('initTest', test, options.numberOfClientsTotal, testDuration);
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
        functions.findClient(clientId).done(function(client) {
            client.socket.invoke('getData', { Messages: client.messages });
        }).fail(function (error){});
    };
    
    function sendMessages(test) {
        $.each(options.clients, function (index, client) {
            if (client.messagesSent++ < options.numberOfMessages) {
                //console.log("Sending message from client " + client.clientId + " time: " + new Date().toString());
                client.socket.invoke(test, new models.Message("1337", client.clientId));
                setTimeout(function() {
                     sendMessages(test);
                }, options.messageInterval );
            } else if(!client.complete) {
                client.complete = true;
                console.log("Sending complete for client " + client.clientId);
                client.socket.invoke('complete', client.clientId);
            }
        });
        

    }
})(loadTest.options, loadTest.communications = loadTest.communications || {}, loadTest.clientFunctions, loadTest.models, loadTest.dom);