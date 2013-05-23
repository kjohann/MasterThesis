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

$.extend(Template.register_dialog, {
	rendered: function () {
		var register_options = {
            title: "Register",
            autoOpen: true,
            modal: true,
            resizable: false,
            height: 420,
            close: function (event, ui) {
            	Session.set("registerDialog", false);
            	$("#register_dialog").dialog("destroy");
            }
        };
        $("#register_dialog").dialog(register_options);
	},
	events: {
		"click #register_button": function() {
			var regUser = new user(0, $("#username").val(), $("#firstname").val(), $("#lastname").val(), $("#adress").val(), $("#password").val());
			$("#register_dialog").dialog("close");
			Meteor.call("register", regUser, function(err, res) {
				if(res) {
					alert("Registered new user! \nTry logging in ;)");
				}
			});			
		}
	}
});

$.extend(Template.add_item_dialog, {
	rendered: function() {
		var add_item_options = {
            title: "Add new item",
            autoOpen: true,
            modal: true,
            resizable: false,
            width: 350,
            close: function (event, ui) {
            	Session.set("addItemDialog", false);
            	$("#add_item_dialog").dialog("destroy");
            }
        };
        $("#add_item_dialog").dialog(add_item_options);
	},
	events: {

	}
});