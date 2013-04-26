var fs = require('fs'),
    promise = require('promised-io/promise'),
    filePath = __dirname + '/data.json',
    models = require('../Server/models.js');

var db = null;
function init() {
    db = JSON.parse(fs.readFileSync(filePath));
}

function query(what, args, callback) {
    var rows = [];
    if(what === 'verifyLogIn') {
        var users = db.Users;
        if(!users) {
            callback({code: 'ER_FILE_NOT_FOUND'}, null, null);
            return;
        }
        for(var i = 0; i < users.length; i++) {
            if(users[i].Username == args.username && users[i].Password == args.password) {
                rows.push(users[i]);
            }
        }
        callback(null, rows, null);
        return;
    }
    if(what == 'registerItem') {
        if(!db.Items) {
            callback({code: 'ER_FILE_NOT_FOUND'}, null);
            return;
        }
        var item = new models.item(db.Items.length + 1, args.name, args.price, args.expires, args.description, args.addedByID);
        db.Items.push(item);
        callback(null, {insertId: item.itemno});
        return;
    }
}

function verifyLogIn(username, password) {
    var deferred = new promise.Deferred();
    var args = {
        username: username,
        password: password
    };
    query('verifyLogIn', args ,function(err, rows, fields) {
        if(err){
            deferred.reject("Failed to verifyLogIn with database: verifyLogIn with error code " + err.code);
        }
        rows.length === 1 ? deferred.resolve(rows[0])
            : rows.length > 1 ? deferred._reject("Failed to verifyLogIn: verifyLogIn returned more that one user - check db")
            : deferred.reject("Failed to verifyLogin: verifyLogIn with " + username + ", " + password);
    });

    return deferred.promise;
}

function registerItem(name, price, expires, description, addedByID) {
    var deferred = new promise.Deferred();
    var args = {
        name: name,
        price: price,
        expires: expires,
        description: description,
        addedByID: addedByID
    };
    query('registerItem', args, function(err, result) {
        if(err){
            deferred.reject("Failed to register item in database: registerItem with error code " + err.code);
        }else{
            deferred.resolve(result.insertId);
        }
    });
    return deferred.promise;
}

exports.init = init;
exports.verifyLogIn = verifyLogIn;
exports.registerItem = registerItem;