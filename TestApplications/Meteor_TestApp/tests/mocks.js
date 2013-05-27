var promise = require('promised-io/promise');
var pDeferred = promise.Deferred;
var deferred = new pDeferred();
var $ = {
    Deferred: function () {
        
    },
    extend: function(obj, extendObj) {
        for(var prop in extendObj) {
            obj[prop] = extendObj[prop];
        }
    }
}

$.Deferred.prototype = {
    promise: function () {return deferred.promise},
    reject: function(what) {return deferred.reject(what)},
    resolve: function(what) {return deferred.resolve(what)}
};

/*
 * Meteor, Session and Template mocks are implemented using code from this site:
 * http://blog.xolv.io/2013/04/unit-testing-with-meteor.html
 */

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

var TemplateClass = function () {
};

TemplateClass.prototype = {
    eventMap: {},
    stub: function (templateName) {
        TemplateClass.prototype[templateName] = {
            events: function (eventMap) {
                for (var event in eventMap) {
                    TemplateClass.prototype.eventMap[event] = eventMap[event];
                }
            },
            fireEvent: function (key, e) {
                TemplateClass.prototype.eventMap[key](e);
            }
        };
    }
};
var Template = new TemplateClass();

var Session = {
    store: {},
    get: function (key) {
        return this.store[key];
    },
    set: function (key, value) {
        this.store[key] = value;
    },
    equals: function (key, value) {
        return this.store[key] === value;
    }
};

exports.mock = {
    Meteor: Meteor,
    $: $,
    Template: Template,
    Session: Session
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
