var express = require('express');
var router = express.Router();

var admin_controller = require('../controllers/admin_controller');

router.get('/', admin_controller.get_admin);

router.get('/newprob', admin_controller.get_new_problem);

router.post('/newprob', admin_controller.post_new_problem);

router.post('/newprob/preview', admin_controller.preview_problem);

router.get('/deleteallsub', admin_controller.delete_all_submission);

router.get('/submission/:sid', admin_controller.get_submission);

module.exports = router;