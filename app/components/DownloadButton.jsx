var React = require('react');
var DownloadButton = (props) => (
  <div className="button-cont"><span className="button"><a href={"/bitbucket/" + props.link + "__.mp3"}>Download!</a></span></div>
);

module.exports = DownloadButton;