$.extend(Template.log_in_dialog, {
	rendered: function () {
		var log_in_options = {
            title: "Log in",
            autoOpen: true,
            modal: true,
            resizable: false,
            height: 230,
            close: function (event, ui) {
            	Session.set("logInDialog", false);
            	$("#log_in_dialog").dialog("destroy");            
            }
        };
    	$("#log_in_dialog").dialog(log_in_options);
	},
	events: {
		"click #log_in_button": function() {
			var username = $("#log_usern").val();
			var password = $("#log_pass").val();
			$("#log_in_dialog").dialog("close");
			Meteor.call("login", username, password, function(err, res) {
				if(!err) {
					Session.set("User", res);
					Session.set("logged_in", true);
				}
			});
		}
	}
});