if(Meteor.isServer) {
	Users = new Meteor.Collection("users");
	if(exports) {
		exports.Users = Users;
	}
}

Items = new Meteor.Collection("items");

if(exports) {
	exports.Items = Items;
}