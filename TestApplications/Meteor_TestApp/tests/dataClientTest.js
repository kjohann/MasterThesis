var testling = require('unit-testling'),
	should = require('should'),
	sinon = require('sinon'),
	mocks = require('./mocks.js');

var init = testling.load('../models/collections/init.js', mocks.mock);

var dataMock = mocks.mock;
dataMock.Items = init.Items;

var data = testling.load('../client/data.js', mocks.mock);

describe('Client side datafunctions', function() {
	beforeEach(function() {
		mocks.resetDeferred();
		if(typeof init.Items.insert.restore !== 'undefined') {
			init.Items.insert.restore();
		}		
		if(typeof init.Items.update.restore !== 'undefined') {
			init.Items.update.restore();
		}	
		if(typeof init.Items.findOne.restore !== 'undefined') {
			init.Items.findOne.restore();
		}	
		if(typeof init.Items.remove.restore !== 'undefined') {
			init.Items.remove.restore();
		}
		if(typeof init.Items.find.restore !== 'undefined') {
			init.Items.find.restore();
		}
	});
	describe('#addItem()', function() {
		it('Should resolve promise with the inserted item on success', function(done) {
			sinon.stub(init.Items, 'insert', function(item, callback) {
				item._id = 'AbcDEfg';
				callback(null, item._id);
			});					
			var newItem = {name: 'Test', minPrice: 1337, expires: new Date('2013-02-04'), addedBy: 'TestUser'};
			var result = data.addItem(newItem);
			result.should.not.equal(false);
			result.then(function(res) {
				should.exist(res);
				res.name.should.equal(newItem.name);
				should.exist(res._id);
				res._id.should.equal('AbcDEfg');
				
				done();
			}, null);
		});
		it('Should return false if some vital fields are missing', function() {
			var result = data.addItem({name: 'Only present field'});
			result.should.equal(false);
			result = data.addItem({name: 'Test', minPrice: 12, addedBy: 'TestUser'});
			result.should.equal(false);
		});
		it('Shuld reject promise with error message on db error', function(done) {
			sinon.stub(init.Items, 'insert', function(item, callback) {				
				callback(true, null);
			});				
			var newItem = {name: 'Test', minPrice: 1337, expires: new Date('2013-02-04'), addedBy: 'TestUser'};
			var result = data.addItem(newItem);
			result.should.not.equal(false);
			result.then(null, function(err) {
				err.should.equal('Error adding Item');
				done();
			});
		});
	});
	describe("#placeBid()", function() {
		it('Should resolve promise with success (true) on successful operation', function(done) {
			sinon.stub(init.Items, 'update', function(selector, changeObj, callback) {
				callback(null);
			})
			var relevantFieldsItem = {bid: 4000, highestBidder: 'AnotherUser', _id: 'AbcDEfg'}; //The function uses only these fields
			var result = data.placeBid(5000, 'TestUser', relevantFieldsItem);
			result.should.not.equal(false);
			result.then(function(success) {
				success.should.equal(true);
				done();
			}, null);
		});
		it('Should return false if bid is lower than the current bid', function() {
			var relevantFieldsItem = {bid: 7000, highestBidder: 'AnotherUser', _id: 'AbcDEfg'}; //The function uses only these fields
			var result = data.placeBid(5000, 'TestUser', relevantFieldsItem);
			result.should.equal(false);
		});
		it('Should reject promise wiht error message if db error', function(done) {
			sinon.stub(init.Items, 'update', function(selector, changeObj, callback) {
				callback(true);
			})
			var relevantFieldsItem = {bid: 4000, highestBidder: 'AnotherUser', _id: 'AbcDEfg'}; //The function uses only these fields
			var result = data.placeBid(5000, 'TestUser', relevantFieldsItem);
			result.should.not.equal(false);
			result.then(null, function(err) {
				err.should.equal('Error placing bid on item: AbcDEfg');
				done();
			});
		});
	});
	describe('#removeItem', function() {
		it('Should resolve promise with true on successful delete', function (done) {
			sinon.stub(init.Items, 'findOne', function(selector) {
				return {name: 'Test', minPrice: 1337, expires: new Date('2013-02-04'), addedBy: 'TestUser', highestBidder: 'SomeOne', bid: 1337};
			});
			sinon.stub(init.Items, 'remove', function(selector, callback) {
				callback(false);
			});
			var result = data.removeItem('AbcDEfg');
			result.should.not.equal(false);
			result.then(function(res) {
				res.should.equal(true);
				done();
			}, null);
		});
		it('Should return false if trying to remove nonexisting item', function () {
			sinon.stub(init.Items, 'findOne', function(selector) {
				return null;
			});
			var result = data.removeItem('Cannot find this');
			result.should.equal(false);
		});
		it('Should reject promise with error message on db error', function(done) {
			sinon.stub(init.Items, 'findOne', function(selector) {
				return {name: 'Test', minPrice: 1337, expires: new Date('2013-02-04'), addedBy: 'TestUser', highestBidder: 'SomeOne', bid: 1337};
			});
			sinon.stub(init.Items, 'remove', function(selector, callback) {
				callback(true);
			});			
			var result = data.removeItem('AbcDEfg');
			result.should.not.equal(false);
			result.then(null, function(err) {
				err.should.equal('Error removing item');
				done();
			});
		});
	});
	describe('#usersBids', function() {
		it('Should return items as bidItems if the user has the lead on 1 or more items', function () {
			var item1 = {name: 'Test1', minPrice: 1337, expires: new Date('2013-02-04'), addedBy: 'TestUser', highestBidder: 'SomeOne', bid: 1337};
			var item2 = {name: 'Test2', minPrice: 7331, expires: new Date('2013-04-06'), addedBy: 'AnotherUser', highestBidder: 'SomeOne', bid: 1337};
			sinon.stub(init.Items, 'find', function(selector) {
				return {
					fetch: function() {
						return [
							item1,
							item2
						];
					}
				};
			});
			var bidItems = data.usersBids('SomeOne');
			bidItems.should.exist;
			bidItems.length.should.equal(2);
			bidItems[0].name.should.equal(item1.name);
			bidItems[1].name.should.equal(item2.name);
		});
		it('Should return false if the user does not have the lead on any items', function() {
			sinon.stub(init.Items, 'find', function(selector) {
				return {
					fetch: function() {
						return [];
					}
				};
			});
			var bidItems = data.usersBids('SomeOne');
			bidItems.should.equal(false);
		});
	});
});

