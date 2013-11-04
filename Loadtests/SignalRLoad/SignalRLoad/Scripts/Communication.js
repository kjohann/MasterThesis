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
        findClient(message.ClientId).done(function(foundClient) {
            foundClient.messages.push(message);
        }).fail(function () {}); //really just ignore
    };    

    root.promoteToMaster = function(clientId) {
        findClient(clientId).done(function(foundClient) {
            foundClient.master = true;
            console.log("Promoted client with id " + foundClient.clientId + " to master");
        }).fail(clientNotFound);
    };

    root.harvest = function() {

    };

    root.harvestComplete = function(charts) {

    };
    
    function findClient(clientId) {
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
    
    function clientNotFound(error) {
        console.log(error.message);
    }

    //bind methods
    //expose those needed by charts.js to global scope
})(loadTest, loadTest.comm = loadTest.comm || {}, loadTest.client);