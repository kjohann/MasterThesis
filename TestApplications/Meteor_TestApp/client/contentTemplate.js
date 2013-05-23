 Meteor.subscribe("items");

 $.extend(Template.content, {
 	loggedIn: function() {
 		return Session.equals("logged_in", true) ? "log_in_invisible" : 'log_in_visible';
 	},
 	notLoggedIn: function() {
 		return !(Session.equals("logged_in", true)) ? "log_in_invisible" : 'log_in_visible';	
 	}
 });