var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));

app.get('/', function(request, response){
  response.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get('/api', function(request, response){
  response.send('{mrpoopy: "butthole"}')
})

app.get('/*', function(request, response){
  // response.redirect('/?channel=' + request.path.slice(1));
  // response.redirect("http://www." + request.path.slice(1) + ".com");
  response.sendFile(path.resolve(__dirname, './public/index.html'));
})

module.exports = app;