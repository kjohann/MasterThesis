(function(loadTest, root, client, functions, charts) {    
    root.initConnection = function() { //here
        for (var i = 0; i < loadTest.numberOfClientsPrBrowser; i++) {
            var clientId = i + loadTest.instanceId;
            var connection = $.hubConnection();
            var hubProxy = connection.createHubProxy('loadHub');

            hubProxy.on('initTest', initTest);
            hubProxy.on('receiveEcho', functions.receiveMessage);
            hubProxy.on('receiveBroadcast', functions.receiveMessage);
            hubProxy.on('harvest', harvest);
            hubProxy.on('harvestComplete', charts.harvestComplete);

            loadTest.clients.push(new client(clientId, {
                conn: connection,
                proxy: hubProxy //most likely only need this..
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

    root.harvest = function() { //here
        //send message array of all clients to server
    };

    //bind methods
    //expose those needed by charts.js to global scope
})(loadTest, loadTest.communications = loadTest.communications || {}, loadTest.client, loadTest.clientFunctions, loadTest.charts);