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
		Users.insert(user, function(err, res) {
			if(err) {
				throw new Meteor.Error(500, "Error inserting user to db");
			} 
		});		
		return user; 
	}
});