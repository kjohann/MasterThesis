(function(loadTest, root, client) {
    //connect to hub
    
    root.initConnection = function() {
        for (var i = 0; i < loadTest.numberOfClientsPrBrowser; i++) {
            var clientId = i + loadTest.instanceId;
            var connection = $.hubConnection();
            var hubProxy = connection.createHubProxy('loadHub');

            hubProxy.on('initTest', initTest);
            hubProxy.on('receiveEcho', receiveMessage); //bind - need separate??
            hubProxy.on('receiveBroadcast', receiveMessage); //bind
            hubProxy.on('harvest', harvest);
            hubProxy.on('harvestComplete', harvestComplete);

            loadTest.clients.push(new client(clientId, {
                conn: connection,
                proxy: hubProxy
            }));

            connection.start().done(function() {
                console.log("Connected");
            }).fail(function() {
                console.log("Error connecting");
            });
        }
    };

    root.initTest = function(test) {
        $.each(loadTest.clients, function(index, currentClient) {
            if (test === 'echo') {
                //do echo
            } else if (test === 'broadcast') {
                //do broadcast
            } else {
                console.error("No such test!");
            }
        });
    };

    root.receiveMessage = function(message) {
        //check if message is response to self -> push to array
    };    

    root.promoteToMaster = function(clientId) {
        $.each(loadTest.clients, function(index, currentClient) {
            if (currentClient.clientId === clientId) {
                currentClient.master = true;
                console.log("Promoted client with id " + currentClient.clientId + " to master");
            }
        });
    };

    root.harvest = function() {

    };

    root.harvestComplete = function(charts) {

    };

    //bind methods
    //expose those needed by charts.js to global scope
})(loadTest, loadTest.comm = loadTest.comm || {}, loadTest.client);