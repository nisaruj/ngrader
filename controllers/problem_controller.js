var fs = require('fs');
var lang = require('../lang');
var request = require('request-promise');
var Problem = require('../models/problem');
var Testcase = require('../models/testcase');
var Submission = require('../models/submission');

exports.get_all_problem = function(req, res) {
    Problem.find({avail: true}, function(err,problem) {
        if (err) {
            console.log(err);
        }
        res.render('problemlist', {user:req.user, problem: problem});
    });
};

exports.get_problem = function(req, res) {
    Problem.findOne({avail: true, pid: req.params.pid}, function (err, prob_res) {
        if (err) return console.log(err);
        res.render('problem', {user: req.user, content: prob_res, result: null, accepted: null, submitLang: req.cookies.submitLang, langlist: lang});
    });
};

exports.post_submission = function(req, res, next) {
    var get_result = function(tokens, sourcecode) {
        let options = [];
        for(var i=0;i<tokens.length;i++) {
            options.push({
                method: 'GET',
                uri: 'https://api.judge0.com/submissions/' + tokens[i].token + '?base64_encoded=false',
                json: true
            });
        }
        const promises = options.map(opt => request(opt));
        Promise.all(promises).then((data) => {
            //console.log(data);
            var result = '', score = 0, time_avg = 0, mem_avg = 0;
            for (var i=0;i<data.length;i++) {
                time_avg += parseFloat(data[i].time);
                mem_avg += data[i].memory;
                if (data[i].status.id === 3) {
                    result += 'P';
                    score++;
                }
                else if (data[i].status.id === 4 || data[i].status.id === 13) result += '-';
                else if (data[i].status.id === 5) result += 'T';
                else if (data[i].status.id === 6) {
                    result = 'Compilation Error';
                    break;
                } else result += 'X';
            }
            var new_submission = new Submission({
                pid: req.params.pid,
                lang: lang[parseInt(req.body.lang)-1].name,
                username: req.user ? req.user.username : 'Guest',
                sourcecode: sourcecode,
                submit_time: new Date(),
                result: {str: result, time: time_avg/data.length, memory: mem_avg/data.length}
                /* TODO : ADD PROBLEM ID */
            });
            new_submission.save(function(err) {
                if (err) console.log(err);
            });
            if (score === data.length) {
                Problem.findOneAndUpdate({pid : req.params.pid}, {$inc : {solved : 1}}, function(err){
                    if(err) console.log(err);
                });
            }
            Problem.findOne({avail: true, pid: req.params.pid}, function (err, prob_res) {
                if (err) return console.log(err);
                res.cookie('submitLang' , req.body.lang)
                .render('problem', {user: req.user, content: prob_res, result: result, accepted: score === data.length, submitLang: req.cookies.submitLang, langlist: lang});
            });
        });
    }
    //console.log(req.file);
    fs.readFile(req.file.path, "utf8", function(err, sourcecode) {
        Testcase.findOne({pid: req.params.pid}, function (err, test_res) {
            if (err) return console.log(err);
            console.log(sourcecode);
            let options = [];
            for(var i=0;i<test_res.cases.length;i++) {
                options.push({
                    method: 'POST',
                    uri: 'https://api.judge0.com/submissions/?base64_encoded=false&wait=true',
                    body: {
                        "source_code": sourcecode,
                        "language_id": parseInt(req.body.lang),
                        "stdin": test_res.cases[i].in,
                        "expected_output": test_res.cases[i].out,
                        "cpu_time_limit": test_res.time_limit,
                        "memory_limit": test_res.memory_limit*1000
                    },
                    json: true
                });
            }
            const promises = options.map(opt => request(opt));
            Promise.all(promises).then((data) => {
                get_result(data, sourcecode);
                fs.unlink(req.file.path);
                //console.log(data);
            });
            //console.log(test_res);
        });
    });
};