addItem = function(item) {	
	if(!item.name || !item.minPrice || !item.expires || !item.addedBy) {
		return false;
	}

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
	if(!bid || !bidder || !item || bid < item.bid || !item._id) {
		return false;
	}
	var deferred = new $.Deferred();
	Items.update({_id: item._id}, {$inc: {bid: (bid - item.bid)}, $set: {highestBidder: bidder}}, function(err) {
		if(!err) {
			deferred.resolve(true);
		} else {
			deferred.reject("Error placing bid on item: " + item._id);
		}
	});
	return deferred.promise();

}

removeItem = function(itemno) {	
	var item = Items.findOne({_id: itemno});
	if(!item) {
		return false;
	}
	var deferred = new $.Deferred();
	Items.remove({_id: itemno}, function(err) {
		if(!err) {
			deferred.resolve(true);
		} else {
			deferred.reject("Error removing item");
		}
	});
	return deferred.promise();
	
}

usersBids = function(username) {
	var items = Items.find({highestBidder: username}).fetch();
	if(items.lenght === 0) {
		return false;
	}
	var bidItems = items.map(function(item) {
		return {
			name: item.name,
			itemno: item._id,
			value: item.bid
		}
	});
	return bidItems;
}

if(typeof exports !== 'undefined') { //add testing capabilties
	exports.addItem = addItem;
	exports.placeBid = placeBid;
	exports.removeItem = removeItem;
	exports.usersBids = usersBids;
}
