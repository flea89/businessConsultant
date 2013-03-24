/**
 * Module dependencies.
 */
'use strict';
var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    expressmap = require('express-routes-map'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    users = [{
        id: 1,
        username: 'bob',
        password: 'secret',
        email: 'bob@example.com'
    }, {
        id: 2,
        username: 'joe',
        password: 'birthday',
        email: 'joe@example.com'
    },{
        id:3,
        username: 'demo',
        password: 'demo',
        email: 'demo@demo.foo'
    }];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use(new LocalStrategy(

function(username, password, done) {
    console.log(username);
    console.log(password);

    // asynchronous verification, for effect...
    process.nextTick(function() {
        // Find the user by username.  If there is no user with the given
        // username, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message.  Otherwise, return the
        // authenticated `user`.
        findByUsername(username, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user ' + username
                });
            }
            if (user.password != password) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user);
        });
    });
}));



console.log('Server in fase di config');
app.configure(function() {
    // app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
        secret: 'keyboard cat',
        maxAge: null,
        cookie: {
            httpOnly: false
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

});

app.configure('development', function() {
    app.use(express.errorHandler());
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send(JSON.stringify({access: 'denied'}));
}

app.get("/culo", ensureAuthenticated, function(req, res, next) {
    res.send("culo");
});

app.get('/user', ensureAuthenticated,function(req,res){
    res.send(JSON.stringify(req.user));
});

app.post('/login', function(req, res, next) {
    console.log(req.body['username'] + ' ou');
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            return res.send(JSON.stringify({
                access: 'denied'
            }));
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.send(JSON.stringify(user));
        });
    })(req, res, next);
});


app.get('/logout', function(req, res) {
    req.logout();
    res.send(JSON.stringify({
        access: 'denied'
    }));
});



expressmap(app).defineRoutes('/bills', require('./routes/bills'), ensureAuthenticated)
    .defineRoutes('/users', require('./routes/users'), ensureAuthenticated)
    .defineRoutes('/admin', require('./routes/admin'), ensureAuthenticated)
    .map();

// app.get('/offline.manifest', function(req, res) {
//     res.header('Content-Type", "text/cache-manifest');
//     res.sendfile(__dirname + '/public/offline.manifest');
// });



var server = http.createServer(app);
// app.listen(3000);

exports = module.exports = server;

exports.use = function() {
    app.use.apply(app, arguments);
};