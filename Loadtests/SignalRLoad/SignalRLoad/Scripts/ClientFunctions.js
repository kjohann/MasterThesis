(function(loadTest, root, charts) {
    root.receiveMessage = function (message) { 
        console.log("receied message on client " + message.ClientId);
        root.findClient(message.ClientId).done(function (foundClient) {
            console.log("Aaaand found client");
            message.ReceivedAtClient = new Date();
            foundClient.messages.push(message);
        }).fail(function (error) { }); //really just ignore
    };

    root.harvestComplete = function(data) {
        var masterId = loadTest.masterId;
        while (loadTest.masterId != 0) {
            console.log("Harvest complete");
            loadTest.masterId = 0;
            root.findClient(masterId).done(function (foundClient) {
                charts.getCharts(data); //only invoke for master client
            }).fail(function(error) {
            });
        }
    };

    root.promoteToMaster = function (clientId) { 
        root.findClient(clientId).done(function (foundClient) {
            foundClient.master = true;
            loadTest.masterId = clientId;
            console.log("Promoted client with id " + foundClient.clientId + " to master");
        }).fail(clientNotFound);
    };

    root.findClient = function(clientId) {
        var deferred = new $.Deferred();

        $.each(loadTest.clients, function(index, currentClient) {
            if (currentClient.clientId == clientId) {
                deferred.resolve(currentClient);
            } else if (index == loadTest.clients.length - 1) {
                deferred.reject({ message: "Couldn't find client with id: " + clientId });
            }
        });

        return deferred.promise();
    };

    function clientNotFound(error) { 
        console.log(error.message);
    }
})(loadTest, loadTest.clientFunctions = loadTest.clientFunctions || {}, loadTest.charts)