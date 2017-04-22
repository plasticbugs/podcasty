var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var $ = require('jquery');

// var App = createReactClass({
//   render: function() {
//     return (
//       <div></div>
//     )
//   }
// });
var lookUpVideos = function (channelID, callback){
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/channels',
    method: 'GET',
    data: {
      key: 'AIzaSyDWPzFJNjsUEfmz5NKoGNP3PHWGrRXxpRk',
      part: 'contentDetails',
      forUsername: channelID
    },
    success: function(data){
      $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems',
        method: 'GET',
        data: {
          key: 'AIzaSyDWPzFJNjsUEfmz5NKoGNP3PHWGrRXxpRk',
          part: 'contentDetails',
          playlistId: data.items[0].contentDetails.relatedPlaylists.uploads
        },
        success: function(data){
          callback(data);
        }
      })
    }
  })
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videoList: ""
    }
  }

  render() {
    return (
      <div>{lookUpVideos(this.props.channel, function(data){
        this.setState({videoList: data})}.bind(this))}
      </div>
    )
  }
}

ReactDOM.render(<App channel={window.location.pathname.substring(1)}/>, document.getElementById('app'));
