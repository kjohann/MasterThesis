//As with the subscribtionInit.js file, this is here purely because of load order.
if(Meteor.isServer) {
	Users = new Meteor.Collection("users");
	Deferred = Npm.require("promised-io/promise").Deferred;
	addUser = function(user) {
		var deferred = new Deferred();
		Users.insert(user, function(err, res) {
			if(err) {
				deferred.reject("Error inserting user to db");
			} else {
				user._id = res;
				deferred.resolve(user);
			}
		});
		return deferred.promise;
	}
}
Items = new Meteor.Collection("items");

addItem = function(item) {
	if(Meteor.isClient) {
		var deferred = new $.Deferred();
		Items.insert(item, function (err, res) {
			if(err) {
				deferred.reject("Error adding Item");
			} else {
				item._id = res;
				deferred.resolve(item);
			}
		});
		return deferred.promise();
	}
}
