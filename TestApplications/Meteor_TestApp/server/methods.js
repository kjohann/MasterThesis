Meteor.methods({
	login: function(username, password) {
		var user = Users.findOne({username: username, password: password});
		if(user) {
			this.setUserId(""+user._id);
			return user;
		} else {
			throw new Meteor.Error(404, "Wrong credentials");
		}
	},
	register: function(user) {
		addUser(user);
		return user;
	}
});