var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemSchema = new Schema({
    pid: Number,
    name: String,
    desc: String,
    time_limit: Number,
    memory_limit: Number,
    tags: [String],
    avail: Boolean,
    difficulty: Number,
    solved: Number
});

module.exports = mongoose.model('Problem', problemSchema);