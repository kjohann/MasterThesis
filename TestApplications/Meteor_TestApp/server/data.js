Deferred = Npm.require("promised-io/promise").Deferred;
verifyLogin = function(username, password) {
	var user = Users.findOne({username: username, password: password});
	return user;
}
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