Meteor.methods({
	login: function(username, password) {
		var user = Users.findOne({username: username, password: password});
		if(user) {
			this.setUserId(""+user.userID);
			return user;
		} else {
			throw new Meteor.Error(404, "Wrong credentials");
		}
	},
	register: function(user) {
		var userID = Users.find({}, {sort: {userID: -1}}).fetch()[0].userID;
		user.userID = userID;
		Users.insert(user, function(err, res) {
			if(err) {
				throw new Meteor.Error(500, "Error inserting user to db");
			} else {
				return true;
			}
		});
	}
});