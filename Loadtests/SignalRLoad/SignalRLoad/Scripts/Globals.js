(function() {
    window.loadTest = window.loadTest || {
        options: {
            chartUrl: "/api/charts",
            masterId: 1, //will be 0 for all browsers that does not have the master
            connectionInterval: 200, //delay between connecting clients 
            numberOfClientsTotal: 1,
            numberOfClientsPrBrowser: 1,
            messageInterval: 500,
            numberOfMessages: 10, //(pr. client) use this with messageInterval to calculate expected duration
            instanceId: 1, //will be id of the first client
            clients: [] //able to hold several clients
        }
    };    
    //example regarding instanceId and clients: 5 clients pr. browser: instanceId will be 1 and it will hold clients with ids 1, 2, 3, 4 and 5. Next instanceId will be 6
})();