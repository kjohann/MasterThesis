var promise = require('promised-io/promise');
var pDeferred = promise.Deferred;
var deferred = new pDeferred();
var $ = {
    Deferred: function () {
        
    }
}

$.Deferred.prototype = {
    promise: function () {return deferred.promise},
    reject: function(what) {return deferred.reject(what)},
    resolve: function(what) {return deferred.resolve(what)}
};


var Meteor = {
	startup: function (newStartupFunction) {
        Meteor.startup = newStartupFunction;
    },
    Collection: function (collectionName) {
        Meteor.instantiationCounts[collectionName] = Meteor.instantiationCounts[collectionName] ?
            Meteor.instantiationCounts[collectionName] + 1 : 1;
    },
    instantiationCounts: {},
    isServer: false,
    isClient: true
};

Meteor.Collection.prototype = {
    insert: function () {},
    find: function () {},
    findOne: function () {},
    update: function () {},
    remove: function () {},
    allow: function () {},
    deny: function () {}
};

exports.mock = {
    Meteor: Meteor,
    $: $
};
exports.setEnv = function(where) {
    if(where === 'server') {
        Meteor.isServer = true;
        Meteor.isClient = false;
    } else {
        Meteor.isClient = true;
        Meteor.isServer = false;
    }
}
exports.resetDeferred = function() {
    deferred = new pDeferred();
}
