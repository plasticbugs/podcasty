const React = require('react');
const DownloadButton = (props) => (
  <div className="button-cont">
    <span className="button">
      <a href={"/bitbucket/" + props.link + ".mp3"}>
        Download!
      </a>
    </span>
  </div>
);

module.exports = DownloadButton;