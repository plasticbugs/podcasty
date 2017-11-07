var React = require('react');
var Percent = require('./Percent.jsx')
var DownloadButton = require('./DownloadButton.jsx');

function VideoEntry(props) {
  if(props.video.percent === "100%") {
    return (<div className="vid-entry">
        <DownloadButton link={props.video.snippet.resourceId.videoId} channel={props.channel} />
        <div className="video-title">
          {props.video.snippet.title}
        </div>
        <div className="thumb-container">
          <img src={props.video.snippet.thumbnails.default.url} width="60" height="45"/>
        </div>
      </div>
    );
  } else {
    return <div className="vid-entry"><img src={props.video.snippet.thumbnails.default.url} width='32' height='18'/>{props.video.snippet.title}<Percent total={props.video.percent} /></div>
  }
};
  // const isLoggedIn = props.isLoggedIn;
  // if (isLoggedIn) {
  //   return <UserGreeting />;
  // }
  // return <GuestGreeting />;


module.exports = VideoEntry;