import React, { Component } from 'react';
import { Progress, Transition, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Percent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showDownload: false
    }
  }

  renderPercentage() {
    let percent = this.props.video.percent ? this.props.video.percent : 0;
    let visible = true;
    if (percent >= 100) {
      visible = false;
    }

    return (
      <Transition visible={visible} onHide={()=> {this.setState({showDownload: true})}} animation='fade' duration={500}>
        <Progress percent={percent} indicating />
      </Transition>
    );
  }

  renderDownloadButton() {
    return (
      <Transition visible={true} transitionOnMount={true} animation='fade' duration={500}>
        <Button onClick={()=>{window.location.href = `bitbucket/${this.props.video.snippet.resourceId.videoId}.mp3`}} floated='right' size="small">Download Audio</Button>
      </Transition>
    );
  }

  showPercentageOrDownloadButton() {
    let contentToDisplay = this.props.video.done ?
      this.renderDownloadButton() :
      this.renderPercentage();

    return contentToDisplay;
  }

  render() {
    if (this.state.showDownload) {
      return (
        this.renderDownloadButton()
      )
    }
    return (
      this.showPercentageOrDownloadButton()
    )
  }
}
