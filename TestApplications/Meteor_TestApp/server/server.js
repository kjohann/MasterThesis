Meteor.publish("users", function() {
	return Users.find({});
});

Meteor.publish("items", function() {
	return Items.find({});
})

Meteor.startup(function(){
	if(Items.find().count() === 0) {
		populateItems();
	}
	if(Users.find().count() === 0) {
		populateUsers();
	}
});

function populateItems() {
	var items = [
		{itemno: 1, name: "Car", minPrice: 300000, expires: new Date("2014-11-12"), description: "This is expensive", addedBy: "Mozilla", highestBidder: "Chrome", bid: 400000},
		{itemno: 2, name: "PC", minPrice: 5500, expires: new Date("2013-03-11"), description: "This runs Windows. Woot!", addedBy: "Mozilla", highestBidder: "IE8", bid: 6000},
		{itemno: 3, name: "iPhone", minPrice: 4000, expires: new Date("2013-05-08"), description: "This is for hipsters", addedBy: "Chrome", highestBidder: "IE8", bid: 5500}
	];
	items.map(function(item){
		Items.insert(item);		
	});
}

function populateUsers() {
	var users = [
		{userID: 1, username: "Chrome", firstname: "Google", lastname: "Chrome", adress: "Google Street", password: "123"},
		{userID: 2, username: "Mozilla", firstname: "Mozilla", lastname: "Firefox", adress: "Mozilla Lane", password: "123"},
		{userID: 3, username: "Opera", firstname: "Ola", lastname: "Nordmann", adress: "Drammensveien 1", password: "123"},
		{userID: 4, username: "IE8", firstname: "Internet", lastname: "Eight", adress: "Badstreet", password: "123"},
		{userID: 5, username: "IE10", firstname: "Internet", lastname: "Ten", adress: "Exitedfor Xbox One Street", password: "123"}
	];

	users.forEach(function(user){
		Users.insert(user);
	})
}