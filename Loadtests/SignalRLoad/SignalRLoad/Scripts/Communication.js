(function(loadTest, root, functions) {    
    root.initConnection = function() { 
        for (var i = 0; i < loadTest.numberOfClientsPrBrowser; i++) {
            var clientId = i + loadTest.instanceId;
            var connection = $.hubConnection();
            var hubProxy = connection.createHubProxy('loadHub');

            hubProxy.on('initTest', root.initTest);
            hubProxy.on('receiveEcho', functions.receiveMessage);
            hubProxy.on('receiveBroadcast', functions.receiveMessage);
            hubProxy.on('harvest', root.harvest);
            hubProxy.on('harvestComplete', functions.harvestComplete);

            loadTest.clients.push(new loadTest.Client(clientId, hubProxy));

            connection.start().done(function() {
                console.log("Connected");
            }).fail(function() {
                console.log("Error connecting");
            });
        }
    };

    root.start = function(test) {
        functions.findClient(loadTest.masterId).done(function(client) {
            var testDuration = loadTest.numberOfMessages * loadTest.messageInterval;
            client.socket.invoke('initTest', test, loadTest.numberOfClientsTotal, testDuration);
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
        $.each(loadTest.clients, function (index, currentClient) {
            var proxy = currentClient.socket;
            proxy.invoke('getData', { Messages: currentClient.messages });
        });
    };
    
    function sendMessages(test) {
        $.each(loadTest.clients, function (index, client) {
            if (client.messagesSent < loadTest.numberOfMessages) {
                client.messagesSent++;
                console.log("Sending message from client " + client.clientId + " time: " + new Date().toString());
                client.socket.invoke(test, new loadTest.Message("1337", client.clientId));
                setTimeout(function() {
                     sendMessages(test);
                }, loadTest.messageInterval );
            } else {
                console.log("Sending complete for client " + client.clientId);
                client.socket.invoke('complete', client.clientId);
            }
        });
    }
})(loadTest, loadTest.communications = loadTest.communications || {}, loadTest.clientFunctions);