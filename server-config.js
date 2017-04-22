var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

import { Pully, Presets } from 'pully';
 
var pully = new Pully();
 
var pullyOptions = {
  url: 'http://www.youtube.com/watch?v=A02s8omM_hI',
  dir: './bitbucket',
  preset: Presets.MP3,
  progress: (data) => console.log(data.percent + '%'),
  path: path.resolve(__dirname, './') // Progress reporter callback...
};
 
app.use(express.static('public'));

app.get('/', function(request, response){
  response.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get('/api', function(request, response){

  pully.download(pullyOptions).then((
    path => console.log('Downloaded to ' + path), // Path to the downloaded file
    err => console.error(err) // Error info
  ))
  .then(console.log('DONE!!!'));
  // response.send('{mrpoopy: "butthole"}')
  // ytdl('http://www.youtube.com/watch?v=A02s8omM_hI', { filter: function(format) { return format.container === 'mp3'; } })
  // .pipe(fs.createWriteStream('video.mp3'));
})

app.get('/*', function(request, response){
  // response.redirect('/?channel=' + request.path.slice(1));
  // response.redirect("http://www." + request.path.slice(1) + ".com");
  response.sendFile(path.resolve(__dirname, './public/index.html'));
})

module.exports = app;