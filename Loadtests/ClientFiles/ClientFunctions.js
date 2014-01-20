(function(options, root, dom) {
    root.receiveMessage = function(message) {
        root.findClient(message.ClientId).done(function (foundClient) {
            if (foundClient.messages[message.MessageId] === undefined) {
                message.ReceivedAtClient = new Date().getTime();
                foundClient.messages[message.MessageId] = message;
                root.registerLatency(message);
            }
        });
    };

    root.harvestComplete = function(data) {
        if (options.masterId != 0) { //do only once
            loadTest.log("Harvest complete");
            options.masterId = 0;
            dom.changeOnHarvestComplete();
            loadTest.data = data;
        }
    };

    root.promoteToMaster = function () {
        var clientId = options.instanceId;
        root.findClient(clientId).done(function (foundClient) {
            foundClient.master = true;
            options.masterId = clientId;
            loadTest.log("Promoted client with id " + foundClient.clientId + " to master");
        }).fail(clientNotFound);
    };

    root.getMessages = function(client) {
        var messages = [];
        for (var message in client.messages) {
            messages.push(client.messages[message]);
        }

        return messages;
    };

    root.findClient = function(clientId) {
        var deferred = new $.Deferred();

        $.each(options.clients, function(index, currentClient) {
            if (currentClient.clientId == clientId) {
                deferred.resolve(currentClient);
            } else if (index == options.clients.length - 1) {
                deferred.reject({ message: "Couldn't find client with id: " + clientId });
            }
        });

        return deferred.promise();
    };

    root.registerLatency = function(message) {
        var latency = message.ReceivedAtClient - message.SentFromClient;
        while (isNaN(options.latencyEvents[message.Key])) {
            options.latencyEvents.push(0);
        }

        options.latencyEvents[message.Key] += latency;
    };

    function clientNotFound(error) {
        console.log(error.message);
    }
})(loadTest.options, loadTest.clientFunctions = loadTest.clientFunctions || {}, loadTest.dom)