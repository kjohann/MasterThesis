﻿(function() {
    window.loadTest = window.loadTest || {
        connectionInterval: 200, //delay between connecting clients 
        numberOfClientsTotal: 0,
        numberOfClientsPrBrowser: 1,
        messageInterval: 200,
        numberOfMessages: 0, //use this with messageInterval to calculate expected duration
        instanceId: 0, //will be id of the first client
        clients: [] //able to hold several clients
    };    
    //example regarding instanceId and clients: 5 clients pr. browser: instanceId will be 1 and it will hold clients with ids 1, 2, 3, 4 and 5. Next instanceId will be 6
})();