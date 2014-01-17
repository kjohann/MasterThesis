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
    conn.on('data', function(args) {
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

    } else if (method === 'echo') {

    } else if(method === 'broadcast') {

    } else if(method === 'complete') {

    } else if(method === 'getData') {

    }
}

//io.sockets.on('connection', function(socket) {
//    socket.on('initTest', function(args) {
//        var testToRun = args[0], numberOfClients = args[1],
//            spacing = args[2], startTime = args[3];
//        hub.initTest(testToRun, numberOfClients, spacing, startTime);
//        io.sockets.emit('initTest', testToRun);
//    });
//    socket.on('echo', function(args) {
//        var message = args[0];
//        hub.echo(message);
//        socket.emit('receiveMessage', message);
//    });
//    socket.on('broadcast', function(args) {
//        var message = args[0];
//        hub.broadcast(message);
//        io.sockets.emit('receiveMessage', message);
//    });
//    socket.on('complete', function(args) {
//        var clientId = args[0];
//        if(hub.complete(clientId)) {
//            io.sockets.emit('harvest');
//        }
//    });
//    socket.on('getData', function(args) {
//        var testData = args[0], numberOfClientsPrBrowser = args[1];
//        if(hub.getData(testData, numberOfClientsPrBrowser)) {
//            io.sockets.emit('harvestComplete', {
//                Duration: hub.monitor.duration,
//                StartTime: hub.monitor.startTime,
//                SentFromClientEvents: hub.monitor.sentFromClientEvents,
//                ReceivedAtServerEvents: hub.monitor.receivedAtServerEvents,
//                SentFromServerEvents: hub.monitor.sentFromServerEvents,
//                Spacing: hub.monitor.spacing,
//                TestDataEntities: hub.monitor.testDataEntities
//            });
//        }
//    })
//});


