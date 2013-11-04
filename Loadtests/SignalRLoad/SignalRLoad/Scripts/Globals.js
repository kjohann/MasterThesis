(function() {
    window.loadTest = window.loadTest || {
        chartUrl: "http://localhost:62753/api/charts",
        masterId: 0, //will be 0 for all browsers that does not have the master
        connectionInterval: 200, //delay between connecting clients 
        numberOfClientsTotal: 0,
        numberOfClientsPrBrowser: 1,
        messageInterval: 200,
        numberOfMessages: 10, //use this with messageInterval to calculate expected duration
        instanceId: 0, //will be id of the first client
        clients: [] //able to hold several clients
    };    
    //example regarding instanceId and clients: 5 clients pr. browser: instanceId will be 1 and it will hold clients with ids 1, 2, 3, 4 and 5. Next instanceId will be 6
})();