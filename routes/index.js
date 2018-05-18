var express = require('express');
var router = express.Router();

var auth_controller = require('../controllers/auth_controller');
var problem_controller = require('../controllers/problem_controller');

router.get('/', function(req, res) {
    res.render('index', {user: req.user});
});

router.get('/login', auth_controller.get_login);

router.post('/login', auth_controller.post_login);

router.get('/logout', auth_controller.get_logout);

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', auth_controller.post_register);

router.get('/auth/facebook', auth_controller.fb_login);

router.get('/auth/facebook/callback', auth_controller.fb_login_cb);

router.get('/custom', problem_controller.get_custom_test);

router.get('/custom/live', function(req, res) {
    res.redirect('/custom');
});

router.post('/custom/live', problem_controller.post_custom_test_live);

module.exports = router;