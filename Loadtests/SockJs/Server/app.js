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
var connections = 0;
var loadServer = sockjs.createServer();
    loadServer.on('connection', function(conn) {
    clients[conn.id] = conn;
    console.log("Connected: " + (++connections));
    conn.on('data', function(json) {
        var args = JSON.parse(json);
        var method = args[0];
        if(method === 'initTest') {
            var testToRun = args[1], numberOfClients = args[2],
                spacing = args[3], startTime = args[4];
            hub.initTest(testToRun, numberOfClients, spacing, startTime);
            broadcastMessage(JSON.stringify(['initTest', testToRun]));
        } else if (method === 'echo') {
            var message = args[1];
            hub.echo(message);
            conn.write(JSON.stringify(['receiveMessage', message]));
        } else if(method === 'broadcast') {
            var message = args[1];
            hub.broadcast(message);
            broadcastMessage(JSON.stringify(['receiveMessage', message]));
        } else if(method === 'complete') {
            var clientId = args[1];
            if(hub.complete(clientId)) {
                broadcastMessage(JSON.stringify(['harvest']));
            }
        } else if(method === 'getData') {
            var testData = args[1], numberOfClientsPrBrowser = args[2];
            if(hub.getData(testData, numberOfClientsPrBrowser)) {
                broadcastMessage(JSON.stringify(['harvestComplete', {
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
    });
    conn.on('close', function() {});
});

loadServer.installHandlers(server, {prefix:'/load'});

function broadcastMessage(argsJson) {
    for(var client in clients) {
        var conn = clients[client];
        conn.write(argsJson);
    }
}


