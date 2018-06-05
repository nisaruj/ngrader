var Problem = require('../models/problem');

exports.get_all_problem = function(req, res) {
    Problem.find({avail: true}, {_id: 0, pid: 1, name: 1, difficulty: 1, solved: 1, tags: 1}, function(err,problem) {
        if (err) {
            console.log(err);
        }
        res.json(problem);
    });
};