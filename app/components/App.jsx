const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const ytHelper = require('../utils/youtubeHelper.js');
const VideoList = require('./VideoList.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/:channel' render={(props) => <VideoList {...props} />} />
        </Switch>
      </BrowserRouter>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));