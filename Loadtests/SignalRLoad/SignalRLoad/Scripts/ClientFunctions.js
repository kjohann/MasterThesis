﻿(function(loadTest, root) {
    root.receiveMessage = function (message) { //not here
        findClient(message.ClientId).done(function (foundClient) {
            foundClient.messages.push(message);
        }).fail(function () { }); //really just ignore
    };

    root.promoteToMaster = function (clientId) { //not here
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
})(loadTest, loadTest.clientFunctions = loadTest.clientFunctions || {})