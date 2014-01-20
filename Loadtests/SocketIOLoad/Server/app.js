var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    hub = require("./hub.js");
io.set('log level', 1);

server.listen(1337);

var pathname = 'C:/Users/Kristian/Documents/GitHub/MasterThesis/Loadtests/SocketIOLoad/Client';

app.use(express.static(pathname));

app.get('/', function(req, res) {
    res.sendfile(pathname + '/Index.html');
}) ;

io.set('transports', [
    'websocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
]);

io.sockets.on('connection', function(socket) {
    socket.on('initTest', function(args) {
        var testToRun = args[0], numberOfClients = args[1],
            spacing = args[2], startTime = args[3];
        hub.initTest(testToRun, numberOfClients, spacing, startTime);
        io.sockets.emit('initTest', testToRun);
    });
    socket.on('echo', function(args) {
        var message = args[0];
        hub.echo(message);
        socket.emit('receiveMessage', message);
    });
    socket.on('broadcast', function(args) {
        var message = args[0];
        hub.broadcast(message);
        io.sockets.emit('receiveMessage', message);
    });
    socket.on('complete', function(args) {
        var clientId = args[0];
        if(hub.complete(clientId)) {
            io.sockets.emit('harvest');
        }
    });
    socket.on('getData', function(args) {
        var testData = args[0], numberOfClientsPrBrowser = args[1];
        if(hub.getData(testData, numberOfClientsPrBrowser)) {
            io.sockets.emit('harvestComplete', {
                Duration: hub.monitor.duration,
                StartTime: hub.monitor.startTime,
                SentFromClientEvents: hub.monitor.sentFromClientEvents,
                ReceivedAtServerEvents: hub.monitor.receivedAtServerEvents,
                SentFromServerEvents: hub.monitor.sentFromServerEvents,
                Spacing: hub.monitor.spacing,
                TestDataEntities: hub.monitor.testDataEntities
            });
        }
    })
});


