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
    socket.on('getAllItems', function(){
        service.getAllItems(socket);
    });

    socket.on('logIn', function(data){
        service.verifyLogIn(data.username, data.password, socket);
    });

    socket.on('registerUser', function(user){
        service.registerUser(user.username, user.firstname, user.lastname, user.adress, user.password, socket);
    });

    socket.on('registerItem', function(item){
        service.registerItem(item.name, item.price, item.expires, item.description, item.addedByID, socket);
    });

    socket.on('getLatestItem', function(data){
        service.getLatestItem(data.itemno, data.userId, data.username, io.sockets);
    });

    socket.on('deleteItem', function(itemno){
        service.deleteItem(itemno, io.sockets);
    });

    socket.on('placeBid', function(data){
        service.placeBid(data.itemno, data.userId, data.value, data.username, io.sockets);
    });

    socket.on('getUsersBids', function(userId){
        service.getBidsByUser(userId, socket);
    });
});
