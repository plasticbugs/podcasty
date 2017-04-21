var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));

app.get('/', function(request, response){
  response.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get('/*', function(request, response){
  response.redirect('/?channel=' + request.path.slice(1));
  // response.redirect("http://www." + request.path.slice(1) + ".com");
})

module.exports = app;