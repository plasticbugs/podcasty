var express = require('express');
var app = express();

app.get('/', function(request, response){
  response.send("woot");
});

module.exports = app;