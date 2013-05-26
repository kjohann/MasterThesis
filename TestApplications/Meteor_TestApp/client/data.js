addItem = function(item) {	
	var deferred = new $.Deferred();
	Items.insert(item, function (err, res) {
		if(err) {
			deferred.reject("Error adding Item");
		} else {
			item._id = res;
			deferred.resolve(item);
		}
	});
	return deferred.promise();
	
}

placeBid = function(bid, bidder, item) {
	var deferred = new $.Deferred();
	Items.update({_id: item._id}, {$inc: {bid: (bid - item.bid)}, $set: {highestBidder: bidder}}, function(err) {
		if(!err) {
			deferred.resolve();
		} else {
			deferred.reject();
		}
	});
	return deferred.promise();

}

removeItem = function(itemno) {	
	var deferred = new $.Deferred();
	Items.remove({_id: itemno}, function(err) {
		if(!err) {
			deferred.resolve();
		} else {
			deferred.reject();
		}
	});
	return deferred.promise();
	
}

usersBids = function(username) {
	var items = Items.find({highestBidder: username}).fetch();
	var bidItems = items.map(function(item) {
		return {
			name: item.name,
			itemno: item._id,
			value: item.bid
		}
	});
	return bidItems;
}