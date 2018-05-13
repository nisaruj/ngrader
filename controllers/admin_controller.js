var lang = require('../lang');
var Problem = require('../models/problem');
var Testcase = require('../models/testcase');
var Submission = require('../models/submission');

exports.get_admin = function(req, res) {
    //if (req.user && req.user.permission === 'admin') {
        Submission.find({}, function(err, sub_res) {
            res.render('admin', {user: req.user, submission: sub_res});
        })
    //} else {
    //    res.send("You don't have permission to access this page.");
    //}
};

exports.get_new_problem = function(req, res) {
    //if (req.user && req.user.permission === 'admin') {
        res.render('newprob', {user: req.user});
    //} else {
    //    res.send("You don't have permission to access this page.");
    //}
};

exports.post_new_problem = function(req, res) {
    //if (req.user && req.user.permission === 'admin') {
        console.log(req.body);
        testcases = []
        for (var i=0;i<req.body['test-input'].length;i++) {
            testcases.push({in: req.body['test-input'][i], out: req.body['test-output'][i]})
        }
        var new_prob = new Problem({
            pid: req.body.pid,
            name: req.body.name,
            desc: req.body.desc,
            time_limit: req.body.time_limit,
            memory_limit: req.body.memory_limit,
            tags: req.body.tags.split(","),
            avail: true,
            difficulty: req.body.diff,
            solved: 0
        });
        var new_test = new Testcase({
            pid: req.body.pid,
            time_limit: req.body.time_limit,
            memory_limit: req.body.memory_limit,
            cases: testcases
        });
        new_prob.save(function(err) {
            new_test.save(function(err) {
                if (err) {
                    console.log('Something went wrong. Try again later.');
                    console.log(err);
                    res.send('<pre>Something went wrong. Try again later.</pre>');
                } else {
                    console.log('Saved problem successfully');
                    res.redirect('/admin');
                }
            });
        });
    //} else {
    //    res.send("You don't have permission to access this page.");
    //}
};

exports.preview_problem = function(req, res) {
    //console.log(req.body);
    req.body.tags = req.body.tags.split(',');
    res.render('problem', {user: req.user, content: req.body, result: null, accepted: null, submitLang: req.cookies.submitLang, langlist: lang});
};

exports.delete_all_submission = function(req, res) {
    Submission.remove({}, function(err) {
        if(err) console.log(err);
        console.log('Removed all submissions');
        res.redirect('/admin');
    });
};