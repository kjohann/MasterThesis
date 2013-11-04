(function(loadTest, root, client) {
    //connect to hub
    
    root.initConnection = function() { //here
        for (var i = 0; i < loadTest.numberOfClientsPrBrowser; i++) {
            var clientId = i + loadTest.instanceId;
            var connection = $.hubConnection();
            var hubProxy = connection.createHubProxy('loadHub');

            hubProxy.on('initTest', initTest);
            hubProxy.on('receiveEcho', receiveMessage); 
            hubProxy.on('receiveBroadcast', receiveMessage); 
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

    root.initTest = function(test) { //here
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

    root.receiveMessage = function(message) { //not here
        findClient(message.ClientId).done(function(foundClient) {
            foundClient.messages.push(message);
        }).fail(function () {}); //really just ignore
    };    

    root.promoteToMaster = function(clientId) { //not here
        findClient(clientId).done(function(foundClient) {
            foundClient.master = true;
            console.log("Promoted client with id " + foundClient.clientId + " to master");
        }).fail(clientNotFound);
    };

    root.harvest = function() { //here
        //send message array of all clients to server
    };

    root.harvestComplete = function(charts) { //in charts somehow
        //deisplay charts
    };
    
    function findClient(clientId) { //utils?
        var deferred = new $.Deferred();

        $.each(loadTest.clients, function (index, currentClient) {
            if (currentClient.clientId === clientId) {
                deferred.resolve(currentClient);
            } else if (index === loadTest.clients.length - 1) {
                deferred.reject({ message: "Couldn't find client with id: " + clientId });
            }
        });

        return deferred.promise();
    }
    
    function clientNotFound(error) { //utils - need?
        console.log(error.message);
    }

    //bind methods
    //expose those needed by charts.js to global scope
})(loadTest, loadTest.comm = loadTest.comm || {}, loadTest.client);