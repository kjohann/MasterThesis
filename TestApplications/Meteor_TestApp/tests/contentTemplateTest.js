var testling = require('unit-testling'),
	should = require('should'),
	sinon = require('sinon'),
	mocks = require('./mocks.js');

mocks.mock.Template.stub('content');
var Session = mocks.mock.Session;
var eStub = {preventDefault: function() {/*not important*/}};

var contentTemplate = testling.load('../client/contentTemplate.js', mocks.mock);	

describe('Template.content', function() {
	describe('#loggedIn() and #notLoggedIn()', function() {
		it('Should return visible when Session["logged_in"] is true. notLoggedIn should do opposite', function() {
			Session.set('logged_in', true);
			contentTemplate.Template.content.loggedIn().should.equal('visible');
			contentTemplate.Template.content.notLoggedIn().should.equal('invisible');
		});
		it('Should return invisible when Session["logged_in" is false', function() {
			Session.set('logged_in', false);
			contentTemplate.Template.content.loggedIn().should.equal('invisible');
			contentTemplate.Template.content.notLoggedIn().should.equal('visible');
		});
	});
	describe('#loggedInUser()', function() {
		it('Should get the logged in user if user is present or emptystrig', function() {
			var res = contentTemplate.Template.content.loggedInUser();
			res.should.equal('');
			Session.set('User', {username: 'Chrome'});
			res = contentTemplate.Template.content.loggedInUser();
			res.should.equal('Chrome');
		});
	});

	describe('#click #login_link', function() {
		it('Should make #logInDialog() to return true', function() {
			contentTemplate.Template.content.fireEvent('click #login_link', eStub);
			contentTemplate.Template.content.logInDialog().should.equal(true);
		});
	});
	describe('#click #register_link', function() {
		it('Should make #registerDialog() to return true', function() {
			contentTemplate.Template.content.fireEvent('click #register_link', eStub);
			contentTemplate.Template.content.registerDialog().should.equal(true);
		});
	});
	describe('#click #logged_in_link', function() {
		it('Should make #viewBids() return true', function() {
			contentTemplate.Template.content.fireEvent('click #logged_in_link', eStub);
			contentTemplate.Template.content.viewBids().should.equal(true);
		});
	});
});
