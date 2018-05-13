var express = require('express');
var multer = require('multer');
var router = express.Router();

var problem_controller = require('../controllers/problem_controller');
var upload = multer({dest: 'tmp/'});

router.get('/', problem_controller.get_all_problem);

router.get('/:pid', problem_controller.get_problem);

router.post('/:pid',upload.single('submit-file'), problem_controller.post_submission);

router.get('/:pid/clearcookie', function(req, res) {
    res.clearCookie("submitLang")
    .redirect('/problems/' + req.params.pid);
});

module.exports = router;