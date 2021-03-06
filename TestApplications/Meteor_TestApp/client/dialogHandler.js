
function makeDialog(myTemplate, nameSelector, options, session, eventObj) {
	$.extend(myTemplate, {
		rendered: function() {
			$.extend(options, {
				close: function(event, ui) {
					Session.set(session, false);
					$(nameSelector).dialog("destroy");
				}
			});
			$(nameSelector).dialog(options);
		}
	});
	if(eventObj) {
		myTemplate.events(eventObj);
	}
}

var log_in_options = {
            title: "Log in",
            autoOpen: true,
            modal: true,
            resizable: false,
            height: 230
       	}
var register_options = {
            title: "Register",
            autoOpen: true,
            modal: true,
            resizable: false,
            height: 420
        }   

var add_item_options = {
            title: "Add new item",
            autoOpen: true,
            modal: true,
            resizable: false,
            width: 350
        }      

var place_bid_options = {
            title: "Place bid on item",
            autoOpen: true,
            resizable: false,
            modal: true,
            height: 150,
            width: 550
        }   

var viewBids_options = {
            title: "You currently have bids on these items",
            autoOpen: true,
            modal: true,
            resizable: false,
            width: 400
        }                   	

makeDialog(Template.log_in_dialog, "#log_in_dialog", log_in_options, "logInDialog", {
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
});

makeDialog(Template.register_dialog, "#register_dialog", register_options, "registerDialog", {
	"click #register_button": function() {
		var regUser = new user(0, $("#username").val(), $("#firstname").val(), $("#lastname").val(), $("#adress").val(), $("#password").val());
		$("#register_dialog").dialog("close");
		Meteor.call("register", regUser, function(err, res) {
			if(res) {
				alert("Registered new user! \nTry logging in ;)");
			}
		});			
	}
});

makeDialog(Template.add_item_dialog, "#add_item_dialog", add_item_options, "addItemDialog", {
	"click #addButton": function() {
		var itemname = $("#itemname").val();
		var minprice = parseInt($("#minprice").val());
		var expires = new Date($("#expires").val());
		var description = $("#description").val();
    	var addedBy = Session.get("User").username;

    	var newItem = new auctionItem(itemname, minprice, expires, description, addedBy, "", 0);
    	$("#add_item_dialog").dialog("close");
    	var result = addItem(newItem);
    	if(result) {
    		result.then(
    			function(res) {
    				console.log("Successfully added item: " + res.name);
    			},
    			function(err) {
    				console.log(err);
    			},
    			null
    		);
    	} else {
    		console.log("Error adding item");
    	}
	}
});

makeDialog(Template.place_bid_dialog, "#place_bid_dialog", place_bid_options, "activeItem", {
	"click #place_bid_button": function() {
		var bid = parseInt($("#bid").val());
		var item = Session.get("activeItem");
		var result = placeBid(bid, Session.get("User").username ,item);
		if(result) {
			$("#place_bid_dialog").dialog("close");
			result.then(function(success) {
				console.log("Placed bid on item with id: " + item._id);
			}, function(msg) {
				console.log(msg);
			});
		} else {
			console.log("Error placing bid. Maybe the bid was lower?")
		}
	}
});

$.extend(Template.place_bid_dialog, {
	value: function() {return Template.item.value();}
});

makeDialog(Template.viewBids_dialog, "#viewBids_dialog", viewBids_options, "viewBids");

$.extend(Template.viewBids_dialog, {
	viewBids: function() {
		var user = Session.get("User");
		if(user) {
			var bids = usersBids(user.username);
			if(bids) {
				return bids;
			} else {
				console.log("The user doesn't lead on any items");
			}
		}
	}
});
