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
	placeBidDialog: function() {
		var activeItem = Session.get("activeItem");
		return activeItem && activeItem._id === this._id;
	},
	value: function() {		
		var activeItem = Session.get("activeItem");
		return activeItem ? (activeItem.bid > activeItem.minPrice ? activeItem.bid : activeItem.minPrice) : 0; 
	},
	events: {
		"click .bidButton": function() {
			Session.set("activeItem", this);
		},
		"click .removeButton": function() {
			removeItem(this._id).then(function() {
				console.log("Removed item");
			}, function() {
				console.log("Error removing item");
			});
		}
	}
});