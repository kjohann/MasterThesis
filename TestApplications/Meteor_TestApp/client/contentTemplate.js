  $.extend(Template.content, {
 	loggedIn: function() {
 		return Session.equals("logged_in", true) ? "visible" : 'invisible';
 	},
 	notLoggedIn: function() {
 		return !(Session.equals("logged_in", true)) ? "visible" : 'invisible';	
 	},
 	loggedInUser: function() {
 		var user = Session.get("User");
 		return user ? user.username : "";
 	},
 	logInDialog: function() {
 		return Session.get("logInDialog");
 	},
 	registerDialog: function() {
 		return Session.get("registerDialog");
 	},
 	viewBids: function() {
 		return Session.get("viewBids");
 	}
 });

Template.content.events({
 			"click #login_link": function(e) {
 				e.preventDefault();
 				Session.set("logInDialog", true);
 			},
 			"click #register_link": function(e) {
 				e.preventDefault();
 				Session.set("registerDialog", true);
 			},
 			"click #logged_in_link": function(e) {
 				e.preventDefault();
 				Session.set("viewBids", true);
 			}
 	});
