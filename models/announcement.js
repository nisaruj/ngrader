var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announcementSchema = new Schema({
    date: Date,
    desc: String
});

module.exports = mongoose.model('Announcement', announcementSchema);