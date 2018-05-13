var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testcaseSchema = new Schema({
    pid: Number,
    time_limit: Number,
    memory_limit: Number,
    cases: [{in: String, out: String}]
});

module.exports = mongoose.model('Testcase', testcaseSchema);