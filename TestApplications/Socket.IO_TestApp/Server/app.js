var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , service = require('./service')
    , database = require('./database.js')

service.init(database);
server.listen(80);

var pathname = 'C:/Users/Kristian/Documents/GitHub/MasterThesis/TestApplications/Socket.IO_TestApp/Client';

app.use(express.static(pathname));

app.get('/', function (req, res) {
    res.sendfile(pathname + '/Views/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('getAllItems', function(){
        service.getAllItems(function(items, error) {
            if(!error) {
                socket.emit('allItems', items);
            } else {
                console.error(error);
            }
        });
    });

    socket.on('logIn', function(data){
        service.verifyLogIn(data.username, data.password, function(user, error) {
            if(!error) {
                socket.emit('logInResponse', user);
            } else {
                console.error(error);
            }
        });
    });

    socket.on('registerUser', function(user){
        service.registerUser(user.username, user.firstname, user.lastname, user.adress, user.password, function(success, error) {
            if(!error) {
                socket.emit('registerUserResponse', success);
            } else {
                console.error(error);
            }
        });
    });

    socket.on('registerItem', function(item){
        service.registerItem(item.name, item.price, item.expires, item.description, item.addedByID, function(itemno, error) {
            if(!error) {
                socket.emit('registerItemResponse', itemno);
            } else {
                console.error(error);
            }
        });
    });

    socket.on('getLatestItem', function(data){
        service.getLatestItem(data.itemno, data.userId, data.username, function (prettyitem, error) {
            if(!error) {
                io.sockets.emit('latestItemResponse', prettyitem);
            } else {
                console.error(error);
            }
        });
    });

    socket.on('deleteItem', function(itemno){
        service.deleteItem(itemno, function(error) {
            if(!error) {
                io.sockets.emit('deleteItemResponse', itemno);
            } else {
                console.error(error);
            }
        });
    });

    socket.on('placeBid', function(data){
        service.placeBid(data.itemno, data.userId, data.value, data.username, function(bid, error) {
            if(!error) {
                io.sockets.emit('placeBidResponse', bid);
            } else {
                console.error(error);
            }
        });
    });

    socket.on('getUsersBids', function(userId){
        service.getBidsByUser(userId, function(bids, error) {
            if(!error) {
                socket.emit('usersBidsResponse', bids);
            } else {
                console.error(error);
            }
        });
    });
});
