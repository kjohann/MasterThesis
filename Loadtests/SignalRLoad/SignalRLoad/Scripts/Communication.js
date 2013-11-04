(function(loadTest, root, functions) {    
    root.initConnection = function() { //here
        for (var i = 0; i < loadTest.numberOfClientsPrBrowser; i++) {
            var clientId = i + loadTest.instanceId;
            var connection = $.hubConnection();
            var hubProxy = connection.createHubProxy('loadHub');

            hubProxy.on('initTest', initTest);
            hubProxy.on('receiveEcho', functions.receiveMessage);
            hubProxy.on('receiveBroadcast', functions.receiveMessage);
            hubProxy.on('harvest', harvest);
            hubProxy.on('harvestComplete', functions.harvestComplete);

            loadTest.clients.push(new loadTest.Client(clientId, hubProxy));

            connection.start().done(function() {
                console.log("Connected");
            }).fail(function() {
                console.log("Error connecting");
            });
        }
    };

    root.initTest = function(test) { 
        $.each(loadTest.clients, function(index, currentClient) {
            if (test === 'echo' || test === 'broadcast') {
                currentClient.socket.invoke(test, new loadTest.Message("1337", currentClient.clientId));
            } else {
                console.error("No such test!");
            }
        });
    }; 

    root.harvest = function() {
        $.each(loadTest.clients, function(index, currentClient) {
            var proxy = currentClient.socket;
            proxy.invoke('getData', { Messages: currentClient.messages });
        });
    };

    //bind methods
    //expose those needed by charts.js to global scope
})(loadTest, loadTest.communications = loadTest.communications || {}, loadTest.clientFunctions);