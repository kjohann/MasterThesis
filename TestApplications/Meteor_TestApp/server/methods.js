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
		var done = false;
		var retUser;
		addUser(user).then(function(res) {
			retUser = res;
			done = true;
		}, 
		function(err) {
			done = true;
			throw new Meteor.Error(500, err);
		});
		while(!done) {} //wait!

		return retUser;
	}
});