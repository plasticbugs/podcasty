var db = require('../../db/config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
  percent:  String,
  videoid: String,
  link:   String,
  done: Boolean,
  channel: String
});

module.exports = mongoose.model('Video', videoSchema);