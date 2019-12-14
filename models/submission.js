var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new Schema({
    pid: Number,
    username: String,
    lang: String,
    sourcecode: String,
    submit_time: Date,
    time: Number,
    memory: Number,
    result: {str: String, time: Number, memory: Number},
    in_queue: Boolean
});

module.exports = mongoose.model('Submission', submissionSchema);