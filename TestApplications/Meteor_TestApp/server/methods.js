Meteor.methods({
	login: function(username, password) {
		var user = Users.findOne({username: username, password: password});
		if(user) {
			this.setUserId(""+user.userID);
			return user;
		} else {
			throw new Meteor.Error(404, "Wrong credentials");
		}
	}
});