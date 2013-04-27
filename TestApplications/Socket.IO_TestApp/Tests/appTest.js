var app = require('../Server/app.js'),
    client = require('socket.io-client'),
    mysql = require('mysql'),
    fs = require('fs'),
    should = require('should');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'n5user',
    password: 'n5pass',
    database: 'test',
    multipleStatements: true
}),
    socket = null, socket2 = null;

describe('app', function () {
    before(function(done) {   //set up db
        connection.connect();
        var fileContent = fs.readFileSync('./dbRefresh.sql', 'utf8');
        connection.query(fileContent, function(err, result) {
            if(!err) {
                console.log("Database refreshed successfully");
                done();
            } else {
                console.error("Database refresh failed");
                //no done call makes tests fail due to timeout, which is good in this case.
            }
        });
    });
    before(function(done) { //set up socket.io client
        socket = client.connect('localhost', {port: 80});
        socket2 = client.connect('localhost', {port: 80});

        socket.on('connect', function () {
            console.log("Socket connected");
            done();
        });

    });
    after(function(){
        var fileContent = fs.readFileSync('./dbRefresh.sql', 'utf8');
        connection.query(fileContent, function(err, result) {
            if(!err) {
                console.log("Database refreshed successfully");
                done();
            } else {
                console.error("Database refresh failed");
                //no done call makes tests fail due to timeout, which is good in this case.
            }
            connection.end();
        });
    });
    describe('io.socket', function(){
        it('should receive all items', function (done) {
            socket.on('allItems', function (items) {
                should.exist(items);
                items.should.have.lengthOf(3);
                done();
            });
            socket.emit('getAllItems');
        });
        it('should receive userdata on successful login', function(done) {
            socket.on('logInResponse', function (user) {
                user.username.should.equal('Chrome');
                user.userID.should.equal(2);
                done();
            });
            socket.emit('logIn', {username: 'Chrome', password: '123'});
        });
        it('should not receive data on login with wrong credentials', function(done) {
            this.timeout(500);
            var flag = false;
            socket.on('logInResponse', function (user) {
                flag = true;
            });
            socket.emit('logIn', {username: 'Wrong', password: '123'});
            setTimeout(function() {
                flag.should.equal(false);
                done();
            }, 400);
        });
        it('should trigger getLatestItem when registerItem was successFul', function(done) {
            socket.on('latestItemResponse', function(prettyItem) {
                prettyItem.itemno.should.equal(4);
                done();
            });
            socket.on('registerItemResponse', function(itemno) {
                var data = {};
                data.itemno = itemno; data.userId = 3; data.username = 'IE10';
                socket.emit('getLatestItem', data);
            });
            var item = {
                name: 'Insert',
                price: parseInt('1337'),
                expires: new Date(),
                description: 'Description',
                addedByID: 3
            };

            socket.emit('registerItem', item);
        });
        it('should broadcast bid', function(done) {
            var flag = false;
            socket.on('placeBidResponse', function(bid) {
                bid.userId.should.equal(1);
                if(!flag) {
                    flag = true;
                } else {
                    done();
                }
            });
            socket2.on('placeBidResponse', function(bid) {
                bid.userId.should.equal(1);
                if(!flag) {
                    flag = true;
                } else {
                    done();
                }
            });
            var data = {
                itemno: 2,
                userId: 1,
                value: 7000,
                username: 'Mozilla'
            };
            socket.emit("placeBid", data);
        });
    });
});
