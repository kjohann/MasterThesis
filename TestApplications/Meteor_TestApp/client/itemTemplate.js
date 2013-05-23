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
	}
});