var React = require('react');
var DownloadButton = (props) => (
  <div className="button"><a href={"/bitbucket/" + props.link + "__" + props.channel + ".mp3"}>Download!</a></div>
);

module.exports = DownloadButton;