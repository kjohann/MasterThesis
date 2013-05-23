$.extend(Template.itemcontainer, {
 	items: function() {
 		return Items.find({});
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
	events: {
		"click .bidButton": function() {

		}
	}
});