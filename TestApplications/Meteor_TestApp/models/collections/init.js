if(Meteor.isServer) {
	Users = new Meteor.Collection("users");
	if(typeof exports !== 'undefined') {
		exports.Users = Users;
	}
}

Items = new Meteor.Collection("items");

if(typeof exports !== 'undefined') {
	exports.Items = Items;
}