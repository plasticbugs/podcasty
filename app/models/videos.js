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

const Video = mongoose.model('Video', videoSchema);

Video.find({done: false}).remove().exec();

export default Video;