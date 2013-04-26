var service = require('../Server/service.js'),
    should = require('should'),
    database = require('./fakeDB.js');

database.init();
service.init(database);

describe('service', function() {
    describe('#verifyLogIn(username, password)', function () {
        it('should return only one user when credentials are correct', function (done) {
            service.verifyLogIn("User1", "123", function (user, error) {
                user.username.should.equal("User1");
                should.not.exist(error);
                done();
            });
        });
        it('should return error when credentials are wrong', function (done) {
            service.verifyLogIn("User1", "Wrong", function (user, error) {
                should.not.exist(user);
                error.should.equal("Failed to verifyLogin: verifyLogIn with " + "User1" + ", " + "Wrong");
                done();
            })
        })
    });
});




