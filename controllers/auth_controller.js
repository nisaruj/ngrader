var passport = require('passport')
var Account = require('../models/account');

exports.fb_login = function(req, res) {
    passport.authenticate('facebook');
};

exports.fb_login_cb = function(req, res) {
    passport.authenticate('facebook', { 
        successRedirect: '/problems',
        failureRedirect: '/' 
    });
};

exports.post_register = function(req, res) {
    var acc = new Account({ 
        username : req.body.username, 
        email: req.body.email, 
        permission: "user"});
    Account.register(acc, req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    })
};

exports.get_login = function(req, res) {
    if (req.user) {
        res.render('login', {message: "You have already logged in."});
    } else {
        res.render('login', {message: null});
    }
};

exports.post_login = function(req, res) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return;
        }
        if (!user) {
            return res.render('login', {message: "Wrong username or password."});
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.render('login', {message: "Wrong username or password."});
            } else {
                return res.redirect('/');
            }
        });
    })(req, res);
};

exports.get_logout = function(req, res) {
    req.logout();
    res.redirect('/');
};