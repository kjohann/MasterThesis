var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    sockjs = require('sockjs'),
    hub = require("./hub.js");

server.listen(1337, "127.0.0.1");

var pathname = 'C:/Users/Kristian/Documents/GitHub/MasterThesis/Loadtests/SockJs/Client';

app.use(express.static(pathname));

app.get('/', function(req, res) {
    res.sendfile(pathname + '/Index.html');
});

var clients = [];

var loadServer = sockjs.createServer();
    loadServer.on('connection', function(conn) {
    clients[conn.id] = conn;
    conn.on('data', function(json) {
        var args = JSON.parse(json);
        var method = args[0];
        if(method !== 'echo') { //do broadcast
            for(var client in clients) {
                routeMessage(args, clients[client]);
            }
        } else {
            routeMessage(args, conn);
        }
    });
    conn.on('close', function() {});
});

loadServer.installHandlers(server, {prefix:'/load'});

function routeMessage(args, conn) {
    var method = args[0];
    if(method === 'initTest') {
        var testToRun = args[1], numberOfClients = args[2],
            spacing = args[3], startTime = args[4];
        hub.initTest(testToRun, numberOfClients, spacing, startTime);
        conn.write(JSON.stringify(['initTest', testToRun]));
    } else if (method === 'echo') {
        var message = args[1];
        hub.echo(message);
        conn.write(JSON.stringify(['receiveMessage', message]));
    } else if(method === 'broadcast') {
        var message = args[1];
        hub.broadcast(message);
        conn.write(JSON.stringify(['receiveMessage', message]));
    } else if(method === 'complete') {
        var clientId = args[1];
        if(hub.complete(clientId)) {
            conn.write(JSON.stringify(['harvest']));
        }
    } else if(method === 'getData') {
        var testData = args[1], numberOfClientsPrBrowser = args[2];
        if(hub.getData(testData, numberOfClientsPrBrowser)) {
            conn.write(JSON.stringify(['harvestComplete', {
                Duration: hub.monitor.duration,
                StartTime: hub.monitor.clientStartTime,
                SentFromClientEvents: hub.monitor.sentFromClientEvents,
                ReceivedAtServerEvents: hub.monitor.receivedAtServerEvents,
                SentFromServerEvents: hub.monitor.sentFromServerEvents,
                Spacing: hub.monitor.spacing,
                TestDataEntities: hub.monitor.testDataEntities
            }]));
        }
    }
}


