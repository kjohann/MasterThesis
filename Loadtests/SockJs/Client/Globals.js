(function() {
    window.loadTest = window.loadTest || {
        options: {
            chartUrl: "http://localhost/ChartsAPI/api/charts",
            spacing: 1,
            masterId: 0, //will be 0 for all browsers that does not have the master
            connectionInterval: 0, //delay between connecting clients 
            numberOfClientsTotal: 0,
            numberOfClientsPrBrowser: 0,
            messageInterval: 0,
            numberOfMessages: 0, //(pr. client) use this with messageInterval to calculate expected duration
            instanceId: 1, //will be id of the first client
            clients: [], //able to hold several clients
            latencyEvents: [], //will hold accumulated latency within each interval (time)
            registeredMessages: [],
            connectionsTried: 0,
            locks: {
                initLock: 0,
                harvestLock: 0,
                allComplete: false
            }
        },
        log : function(msg, error) {
            if(!error) {
                console.log(msg);
            } else {
                console.error(error);
            }
            $("#info").append(msg + "<br>");
        }
    };
    //example regarding instanceId and clients: 5 clients pr. browser: instanceId will be 1 and it will hold clients with ids 1, 2, 3, 4 and 5. Next instanceId will be 6
})();