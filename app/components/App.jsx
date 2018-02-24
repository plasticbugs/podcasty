const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
const ytHelper = require('../utils/youtubeHelper.js')

const Header = require('./Header.jsx');
const VideoList = require('./VideoList.jsx');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videos: this.props.theList,
      uploads: null,
      polling: false
    }
    this.pollServerForUpdates = this.pollServerForUpdates.bind(this);
  }
  
  pollServerForUpdates() {
    axios.get('/api?channel=' + this.props.channel)
    .then(results => {
      let data = results.data;
      for(let i = 0; i < this.state.videos.length; i++){
        for (let j = 0; j < data.videos.length; j++) {
          if(this.state.videos[i].snippet.resourceId.videoId === data.videos[j].id) {
            let listCopy = this.state.videos.slice();
            listCopy[i].percent = data.videos[j].percent;
            listCopy[i].done = data.videos[j].done;
            this.setState({videos: listCopy});
          }
        }
      }
    })
  }

  componentDidMount() {
    var obj = {};
    obj.videos = this.props.theList;
    obj.channel = this.props.channel;
    axios.post('/api?channel=' + obj.channel, obj)
    .then(success => {
      console.log("Successful POST")
    })
    .catch(err => {
      console.log("Error posting data: ", err)
    })
    if (!this.state.polling) {
      this.setState({polling: true}, () => {
        this.pollServerForUpdates();
        setInterval( () => {
          this.pollServerForUpdates()
        }, 5000)
      })
    }
  }

  render() {
    return (
      <div>
        <VideoList
          uploads={this.props.uploads}
          videos={this.props.theList}
          channel={this.props.channel}
        />
      </div>
    )
  }
}


ytHelper.lookUp(window.location.pathname.substring(1), (data, uploads) => {
  ReactDOM.render(<App channel={window.location.pathname.substring(1)} theList={data} uploads={uploads}/>, document.getElementById('app'));
});
