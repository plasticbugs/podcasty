var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var $ = require('jquery');

var Header = require('./Header.jsx');
var VideoList = require('./VideoList.jsx');

// var App = createReactClass({
//   render: function() {
//     return (
//       <div></div>
//     )
//   }
// });

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videoList: this.props.theList
    }
  }

  componentDidMount() {
    setInterval(function(){
      var result = []
      for(var i = 0; i < this.props.theList.length; i++) {
        this.props.theList[i].contentDetails.videoId += ":D";
        result.push(this.props.theList[i]);
      }
      $.get('/api', function(data){
        console.log(data);
      })
      this.setState({videoList: result});
    }.bind(this), 3000);
  }

  render() {
    return (
      <div>
        <Header channel={this.props.channel}/>
        <VideoList channels={this.props.theList} />
      </div>
    )
  }

        // {this.props.theList.map(function(element){
        //   return <li>element.contentDetails.videoId</li>
        // })}
  /*render() {
    return (
      <div>{lookUpVideos(this.props.channel, function(data){
        this.setState({videoList: data})}.bind(this))}
      </div>
    )
  }*/
}

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
          maxResults: 10,
          playlistId: data.items[0].contentDetails.relatedPlaylists.uploads
        },
        success: function(data){
          var resultsArray = [];
          for(var i = 0; i < data.items.length; i++) {
            resultsArray.push(data.items[i]);
          }
          console.log(resultsArray);
          callback(resultsArray);
        }
      })
    }
  })
}

lookUpVideos(window.location.pathname.substring(1), function(data){
  ReactDOM.render(<App channel={window.location.pathname.substring(1)} theList={data}/>, document.getElementById('app'));
});
