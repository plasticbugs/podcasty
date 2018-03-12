const { Pully, Presets } = require('pully')
const path = require('path');

// const server = require('http').createServer();
const io = require('socket.io').listen(3001);
io.set( 'origins', 'http://localhost:*' );
let pully = new Pully();

module.exports.queueDownloads = (videos, downloadQueue) => {
  io.of(`/${videos[0].channel}`)
  .on('connection', function(socket){
    console.log('someone connected');
    socket.emit('hello', 'yo dawg!')
  });
  let optionsHash = {};
  console.log(videos.length)
  videos.forEach( video => {
    let pullyOptions = {
      dir: './public/bitbucket',
      template: '${id}',
      preset: Presets.MP3,
      videoid: video.videoid,
      progress: function(data) { // Progress reporter callback...
        console.log(data.percent)
        // video.percent = data.percent;
        // video.save();
        // console.log(data.percent + '%')
      },
      path: path.resolve(__dirname, './') 
    };
    pullyOptions.url = 'http://www.youtube.com/watch?v=' + video.videoid;
    const job = downloadQueue.createJob(pullyOptions);
    job.save()
    .then( job => {
      optionsHash[job.id] = pullyOptions;
      job.on('succeeded', (result) => {
        video.done = true;
        video.save();
        console.log(`Received result for job ${job.id}: ${result}`);
      });
    })
  })
  
  downloadQueue.process(function (job, done) {
    console.log(`Processing job ${job.id}`);
    executeDownload(optionsHash[job.id], done);
    // return done(null, job.data.x + job.data.y);
  });
}

const executeDownload = (options, done) => {
  pully.download(options).then(
    place => {
      console.log('Downloaded to ' + place.path);
        done(null, options.videoid)
      },
      err => {
        done(err);
      }
  )
}
