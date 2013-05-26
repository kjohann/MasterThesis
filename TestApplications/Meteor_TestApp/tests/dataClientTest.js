var testling = require('unit-testling'),
	should = require('should'),
	sinon = require('sinon'),
	mocks = require('./mocks.js');

var init = testling.load('../models/collections/init.js', mocks.mock);

var dataMock = mocks.mock;
dataMock.Items = init.Items;

var data = testling.load('../client/data.js', mocks.mock);

describe('test', function() {
	it('should work',function(done) {
		var a = 2;
		a.should.equal(2);
		var stub = sinon.stub(init.Items, 'insert', function(item, callback) {
			item._id = "random";
			callback(null, item._id);
		})
		data.addItem({name: 'test'}).then(function(res) {
			should.exist(res);
			done();
		}, function(err) {

		});
	})
});	

