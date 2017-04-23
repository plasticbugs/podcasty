var React = require('react');
var Percent = require('./Percent.jsx')
var DownloadButton = require('./DownloadButton.jsx');

function VideoEntry(props) {
  if(props.video.percent === "100%") {
    return <div>{props.video.snippet.title}<DownloadButton link={props.video.snippet.resourceId.videoId} channel={props.channel} /></div>
  } else {
    return <div>{props.video.snippet.title}<Percent total={props.video.percent} /></div>
  }
};
  // const isLoggedIn = props.isLoggedIn;
  // if (isLoggedIn) {
  //   return <UserGreeting />;
  // }
  // return <GuestGreeting />;


module.exports = VideoEntry;