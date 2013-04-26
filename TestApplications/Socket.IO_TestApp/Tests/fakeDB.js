var fs = require('fs'),
    promise = require('promised-io/promise'),
    filePath = __dirname + '/data.json';

var db = null;
function init() {
    db = JSON.parse(fs.readFileSync(filePath));
}

function query(what, args, callback) {
    var rows = [];
    if(what === "verifyLogIn") {
        var users = db.Users;
        for(var i = 0; i < users.length; i++) {
            if(users[i].Username == args.username && users[i].Password == args.password) {
                rows.push(users[i]);
            }
        }
        callback(rows);
    }
}

function verifyLogIn(username, password) {
    var deferred = new promise.Deferred();
    var args = {
        username: username,
        password: password
    }
    query("verifyLogIn", args ,function(rows) {
        rows.length === 1 ? deferred.resolve(rows[0])
            : rows.length > 1 ? deferred._reject("Failed to verifyLogIn: verifyLogIn returned more that one user - check db")
            : deferred.reject("Failed to verifyLogin: verifyLogIn with " + username + ", " + password);
    });

    return deferred.promise;
}

exports.init = init;
exports.verifyLogIn = verifyLogIn;