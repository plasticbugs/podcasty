var db = require('../config.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var channelSchema = new Schema({
  title: String,
  videos : [{ type: Schema.Types.ObjectId, ref: 'Video' }]
});

module.exports = mongoose.model('Channel', channelSchema);