var service = require('../Server/service.js'),
    should = require('should'),
    sinon = require('sinon'),
    promise = require('promised-io/promise');
function stubVerifyLogIn(resolve, returnObj) {
    sinon.stub(service.database, "verifyLogIn", function(username, password) {
        var deferred = new promise.Deferred();
        if(resolve) {
            deferred.resolve(returnObj);
        } else {
            deferred.reject(returnObj);
        }
        return deferred.promise;
    });
}
describe('service', function() {
    before(function(done) {
        done();
    });
    describe('#verifyLogIn(username, password, callback)', function () {
        it('should return only one user when credentials are correct', function (done) {
            stubVerifyLogIn(true, {Username: "User1"});
            service.verifyLogIn("User1", "123", function (user, error) {
                user.username.should.equal("User1");
                should.not.exist(error);
                service.database.verifyLogIn.restore();
                done();
            });
        });
        it('should return error when credentials are wrong', function (done) {
            stubVerifyLogIn(false, "Failed to verifyLogin: verifyLogIn with " + "User1" + ", " + "Wrong");
            service.verifyLogIn("User1", "Wrong", function (user, error) {
                should.not.exist(user);
                error.should.equal("Failed to verifyLogin: verifyLogIn with " + "User1" + ", " + "Wrong");
                service.database.verifyLogIn.restore();
                done();
            })
        });
       it('should return error if parameters are undefined', function (done) {
            service.verifyLogIn(undefined, undefined,function(user, error) {
                should.not.exist(user);
                error.should.equal("Verification failed: verifyLogIn of undefined, undefined");
                done();
            });
        });
        it('should return error if username is undefined', function(done) {
            service.verifyLogIn(undefined, "123",function(user, error) {
                should.not.exist(user);
                error.should.equal("Verification failed: verifyLogIn of undefined, 123");
                done();
            });
        });
        it('should return error if password is undefined', function(done) {
            service.verifyLogIn("User", undefined,function(user, error) {
                should.not.exist(user);
                error.should.equal("Verification failed: verifyLogIn of User, undefined");
                done();
            });
        })
    });

    describe('registerItem(name, price, expires, description, addedById, callback)', function () {
        it('should return insertId of new item', function (done) {
            sinon.stub(service.database, "registerItem", function(name, price, expires, description, addedByID) {
                var deferred = new promise.Deferred();
                deferred.resolve(42);
                return deferred.promise;
            });
            service.registerItem('Insert', 3000, '2013-04-28T13:59:40.351Z', 'Description', 1, function (itemno, error) {
                itemno.should.equal(42);
                should.not.exist(error);
                service.database.registerItem.restore();
                done();
            });
        });
        it('should replace undefined description with empty string. i.e not give error', function(done) {
            sinon.stub(service.database, "registerItem", function(name, price, expires, description, addedByID) {
                var deferred = new promise.Deferred();
                deferred.resolve(1337);
                return deferred.promise;
            });
            service.registerItem('Insert', 3000, '2013-04-28T13:59:40.351Z', undefined, 1, function (itemno, error) {
                itemno.should.equal(1337);
                should.not.exist(error);
                service.database.registerItem.restore();
                done();
            });
        });
        /*it('should give error if price is a negative number', function(done) {
            service.registerItem('Insert', -1, '2013-04-28T13:59:40.351Z', 'Description', 1, function (itemno, error) {
                should.not.exist(itemno);
                error.should.equal("Registration failed: registerItem with Insert, -1, 2013-04-28T13:59:40.351Z, Description, 1");
                done();
            });
        });
        it('should give error if it receives an invalid date', function(done) {
            service.registerItem('Insert', 1, 'InvalidLol', 'Description', 1, function (itemno, error) {
                should.not.exist(itemno);
                error.should.equal("Error parsing date");
                done();
            });
        }); */
    });
});




