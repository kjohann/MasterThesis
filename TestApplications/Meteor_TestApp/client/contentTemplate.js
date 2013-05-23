  $.extend(Template.content, {
 	loggedIn: function() {
 		return Session.equals("logged_in", true) ? "log_in_invisible" : 'log_in_visible';
 	},
 	notLoggedIn: function() {
 		return !(Session.equals("logged_in", true)) ? "log_in_invisible" : 'log_in_visible';	
 	},
 	loggedInUser: function() {
 		var user = Session.get("User");
 		return user ? user.username : "";
 	},
 	logInDialog: function () {
 		return Session.get("logInDialog");
 	},
 	events: {
 			"click #login_link": function(e) {
 				e.preventDefault();
 				Session.set("logInDialog", true);
 			}
 	}
 });