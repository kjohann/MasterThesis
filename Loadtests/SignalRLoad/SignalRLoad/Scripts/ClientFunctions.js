(function(loadTest, root, charts) {
    root.receiveMessage = function (message) { 
        findClient(message.ClientId).done(function (foundClient) {
            message.ReceivedAtClient = new Date();
            foundClient.messages.push(message);
        }).fail(function () { }); //really just ignore
    };

    root.harvestComplete = function(data) {
        charts.getCharts(data);
    };

    root.promoteToMaster = function (clientId) { 
        findClient(clientId).done(function (foundClient) {
            foundClient.master = true;
            console.log("Promoted client with id " + foundClient.clientId + " to master");
        }).fail(clientNotFound);
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
})(loadTest, loadTest.clientFunctions = loadTest.clientFunctions || {}, loadTest.charts)