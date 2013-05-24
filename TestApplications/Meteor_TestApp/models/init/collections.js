//As with the subscribtionInit.js file, this is here purely because of load order.
if(Meteor.isServer) {
	Users = new Meteor.Collection("users");
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
