var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api_controller');

router.get('/', function(req, res) {
    res.send('API Usage<br><p>Method: GET<br>URL: /api/problems<br>Get all available problems');
});

router.get('/problems', api_controller.get_all_problem);

module.exports = router;