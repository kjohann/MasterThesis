 Meteor.subscribe("items");

 $.extend(Template.content, {
 	loggedIn: function() {
 		return Session.equals("logged_in", true) ? "log_in_visibile" : 'log_in_invisible';
 	},
 	notLoggedIn: function() {
 		return !(Session.equals("logged_in", true)) ? "log_in_visibile" : 'log_in_invisible';	
 	}
 });