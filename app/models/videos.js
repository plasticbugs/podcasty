var db = require('../config.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
  percent:  String,
  videoid: String,
  link:   String,
  done: Boolean
});

module.exports = mongoose.model('Video', videoSchema);