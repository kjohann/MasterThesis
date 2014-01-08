var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

io.set('log level', 1);

server.listen(1337);

var pathname = 'C:/Users/Kristian/Documents/GitHub/MasterThesis/Loadtests/SocketIOLoad/Client';

app.use(express.static(pathname));

app.get('/', function(req, res) {
    res.sendfile(pathname + "/Index.html");
}) ;


