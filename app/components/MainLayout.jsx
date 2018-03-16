import React, { Component } from 'react';
import MenuBar from './MenuBar.jsx';
import VideoList from './VideoList.jsx';

class MainLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MenuBar />
        <VideoList {...this.props} />
      </div>
    )
  }
}

export default MainLayout;