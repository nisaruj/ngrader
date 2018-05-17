var lang = require('../lang');
var Problem = require('../models/problem');
var Testcase = require('../models/testcase');
var Submission = require('../models/submission');

exports.get_admin = function(req, res) {
    //if (req.user && req.user.permission === 'admin') {
        Submission.find({}, function(err, sub_res) {
            Problem.find({}, function(err, prob_res) {
                res.render('admin', {user: req.user, submission: sub_res, problem: prob_res});
            })
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
        //console.log(req.body);
        if (!req.body.hasOwnProperty('test-input')) {
            return res.send('Empty test case.')
        }
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
        Problem.find({pid: req.body.pid}, function(err, pr) {
            if (pr.length) {
                res.send('This pid is already exist.');
            } else {
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
            }
        })
        
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

exports.get_submission = function(req, res) {
    Submission.findOne({_id: req.params.sid}, function(err, sub_res) {
        if (sub_res) {
            res.render('submission', {user: req.user, submission: sub_res});
        } else {
            res.send('Submission not found.');
        }
    });
};

exports.update_avail = function(req, res) {
    console.log(req.body.avail);
    const is_avail = new Set(req.body.avail.map(function(num) { return parseInt(num,10); }));
    Problem.find({},function(err, problem_res) {
        for (var i=0;i<problem_res.length;i++) {
            problem_res[i].avail = is_avail.has(i);
            Problem.update({_id: problem_res[i]._id}, {avail: problem_res[i].avail}, function(err, up_res) {
                if (err) console.log(err);
            });
        }
        res.redirect('/admin');
    });
}