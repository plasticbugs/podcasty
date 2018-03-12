var React = require('react');
var Percent = require('./Percent.jsx')
var DownloadButton = require('./DownloadButton.jsx');

const VideoEntry = (props) => {
  let downloadOrPercent = props.video.done ? <DownloadButton link={props.video.snippet.resourceId.videoId} channel={props.channel} /> : <Percent total={props.video.percent} />;
  return (
    <div className="vid-entry">
      {downloadOrPercent}
      <div className="video-title">
        {props.video.snippet.title}
      </div>
      <div className="thumb-container">
        <img src={props.video.snippet.thumbnails.default.url} width="60" height="45"/>
      </div>
    </div>
  );
}

module.exports = VideoEntry;