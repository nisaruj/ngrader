var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api_controller');

router.get('/', function(req, res) {
    res.render('apis', {user: req.user})
});

router.post('/submit/custom', api_controller.post_submit_custom);

router.get('/problems', api_controller.get_all_problem);

module.exports = router;