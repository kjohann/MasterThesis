//To run the tests: start meteor server and the selenium standalone server
var chai = require('chai'),
	assert = chai.assert,
	expect = chai.expect;

var client; 
var webdriverjs = require('webdriverjs');
var localhost = 'http://localhost:3000';

describe('Meteor integrationtests', function() {
	this.timeout(45000);
	before(function() {
		client = webdriverjs.remote();
		client.init();
	});
	after(function(done) {
		client.end(done);
	})
	it('Should have title "Auction House"', function(done) {
		client
		.url(localhost)
		.getTitle(function(err, title) {
			expect(err).to.be.null;
			assert.strictEqual(title, 'Auction House');
		})
		.call(done);
	});
	it('Should get some items at init', function(done) {
		client
		.url(localhost)
		.waitFor('.item', 5000, function(err, res) {
			expect(err).to.be.null;		
		})
		.call(done);
	});
	it('Should be able to log in', function(done) {
		client
		.url(localhost)
		.waitFor('#login_link', 5000, function(err, res) {
			expect(err).to.be.null;
		})
		.click('#login_link', function(err, res) {
			expect(err).to.be.null;
		})
		.setValue('#log_usern', 'Mozilla', function(err, res) {
			expect(err).to.be.null;
		})
		.setValue('#log_pass', '123', function(err, res) {
			expect(err).to.be.null;	
		})
		.click('#log_in_button', function(err, res) {
			expect(err).to.be.null;		
		})
		.isVisible('.logged_in_as', function(err, res) {
			expect(res).to.be(true);
		})
		.call(done)
	});
});