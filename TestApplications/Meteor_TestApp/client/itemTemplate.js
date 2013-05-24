$.extend(Template.itemcontainer, {
 	items: function() {
 		return Items.find({});
 	},
 	loggedIn: function() {
		return Template.content.loggedIn();
	},
	addItemDialog: function() {
		return Session.get("addItemDialog");
	},
	events: {
		"click #addItemButton": function() {
			Session.set("addItemDialog", true);
		}
	}
});

$.extend(Template.item, {
	expireDate: function() {
		return this.expires.toLocaleDateString();
	},
	loggedIn: function() {
		return Template.content.loggedIn();
	},
	itemno: function() {
		return this._id.substring(0,5); //this is a bit weird since i use MangoDb instead of MySql
	},
	removeVisible: function() {
		var user = Session.get("User");
		if(user) {
			return user.username === this.addedBy ? "visible" : "invisible";
		}
	},
	bidVisibility: function() {
		return this.bid > 0 ? "visible" : "invisible";
	},
	events: {
		"click .bidButton": function() {
			Session.set("placeBidDialog", true);
		}
	}
});