var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , service = require('./service');

server.listen(80);

var pathname = 'C:/Users/Kristian/Documents/GitHub/MasterThesis/TestApplications/Socket.IO_TestApp/Client';

app.use(express.static(pathname));

app.get('/', function (req, res) {
    res.sendfile(pathname + '/Views/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('logIn', function(data){ //need to test this
        service.verifyLogIn(data.username, data.password, socket);
    });
});
