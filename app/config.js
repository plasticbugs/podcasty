var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db/podcasty');
var db = mongoose.connection;