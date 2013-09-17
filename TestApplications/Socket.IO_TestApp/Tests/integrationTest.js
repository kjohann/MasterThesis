var mysql = require('mysql'),
    should = require('should'),
    database = require('../Server/database.js'),
    fs = require('fs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'n5user',
    password: 'n5pass',
    database: 'test',
    multipleStatements: true
})

describe('database', function() {
    before(function(done) {
        database.init(connection, function() {
            var fileContent = fs.readFileSync('./dbRefresh.sql', 'utf8');
            connection.query(fileContent, function(err, result) {
                if(!err) {
                    console.log("Database initialized successfully");
                    done();
                } else {
                    console.error("Database refresh failed");
                    //no done call makes tests fail due to timeout, which is good in this case.
                }
            });
        });
    });
    after(function(done){
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
    it("should be able to log in if credentials are correct", function(done) {
        database.verifyLogIn("Chrome", 123).then(function(res) {
            res.Username.should.equal("Chrome");
            done();
        });
    });
    it("should get error message if credentials are wrong" , function(done) {
        database.verifyLogIn("Wrong", 123).then(function(res) {}, function(err) {
            err.should.equal("Failed to verifyLogin: verifyLogIn with " + "Wrong" + ", " + 123);
            done();
        });
    });
    it("should be able to register a new user and log in with it", function(done) {
        database.registerUser("Test", "Testuser", "Testson", "Teststreet", 42).then(function() {
            database.verifyLogIn("Test", 42).then(function(res) {
                res.Username.should.equal("Test");
                done();
            });
        });
    });
    it("should be able to register a new item and retrieve it from the database", function (done) {
        database.registerItem("Testitem", 1337, '2013-12-13', "This is a test", '1').then(function(res) {
        res.should.equal(5);
            database.getLatestItem(5, 1, "Mozilla").then(function(res) {
                res.name.should.equal("Testitem");
                done();
           });
       });
    });
    it("should be able to delete an existing item", function(done) {
        database.deleteItem(1).then(function() {
            done();
        });
    });
    it("should be able to get all items", function(done) {
        database.getAllItems().then(function(res) {
            res.length.should.equal(3);
            done();
        });
    })

});



