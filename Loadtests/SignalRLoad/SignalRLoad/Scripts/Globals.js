(function() {
    window.loadTest = window.loadTest || {
        numberOfClientsTotal: 0,
        numberOfClientsPrBrowser: 1,
        testDurationInMillis: 0, //need or calculate maybe?
        messageInterval: 0,
        instanceId: 0, //will be id of the first client
        clients: [] //able to hold several clients
    };    
    //example regarding instanceId and clients: 5 clients pr. browser: instanceId will be 1 and it will hold clients with ids 1, 2, 3, 4 and 5. Next instanceId will be 6
})();