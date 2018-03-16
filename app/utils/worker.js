const { Pully, Presets } = require('pully')
const path = require('path');

let pully = new Pully();

module.exports.queueDownloads = (videos, downloadQueue) => {
  const socket = require('../../server').socket;
  const io = require('../../server').io;

  let optionsHash = {};
  console.log(videos.length)
  videos.forEach( video => {
    let pullyOptions = {
      dir: 'dist/public/bitbucket',
      template: '${id}',
      preset: Presets.MP3,
      videoid: video.videoid,
      progress: function(data) { // Progress reporter callback...
        let room = socket.handshake.query.token;

        io.to(room).emit('message', {percent: data.percent, video: video.videoid});
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
