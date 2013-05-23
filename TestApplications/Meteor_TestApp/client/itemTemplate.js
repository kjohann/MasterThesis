$.extend(Template.itemcontainer, {
 	items: function() {
 		return Items.find({});
 	},
 	loggedIn: function() {
		return Template.content.loggedIn();
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
	removeVisible: function () {
		return Session.get("User").username === this.addedBy ? "removeVisible" : "removeInvisible";
	},
	events: {
		"click .bidButton": function() {

		}
	}
});