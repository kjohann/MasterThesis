(function(options, root, functions, models) {    
    root.initConnection = function() { 
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
        }).fail(function (error){ });
    };
    var a = 0;
    root.initTest = function(test) { 
        if (test === 'echo' || test === 'broadcast' && a++ < 1) {
            console.log("Initializing");
            sendMessages(test);
        } else {
            console.error("No such test!");
        }
    }; 

    root.harvest = function() {
        console.log("Harvesting");
        $.each(options.clients, function (index, currentClient) {
            var proxy = currentClient.socket;
            proxy.invoke('getData', { Messages: currentClient.messages });
        });
    };
    
    function sendMessages(test) {
        $.each(options.clients, function (index, client) {
            if (client.messagesSent < options.numberOfMessages) {
                client.messagesSent++;
                console.log("Sending message from client " + client.clientId + " time: " + new Date().toString());
                client.socket.invoke(test, new models.Message("1337", client.clientId));
                setTimeout(function() {
                     sendMessages(test);
                }, options.messageInterval );
            } else {
                console.log("Sending complete for client " + client.clientId);
                client.socket.invoke('complete', client.clientId);
            }
        });
    }
})(loadTest.options, loadTest.communications = loadTest.communications || {}, loadTest.clientFunctions, loadTest.models);