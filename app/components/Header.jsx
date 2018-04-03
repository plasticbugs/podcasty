import React, { Component } from 'react';
import { Header, Input, Popup, Button } from 'semantic-ui-react';

const timeoutLength = 2500;

export default class ChannelHeader extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.state = {
      isOpen: false
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  copyFeedLink() {
    let copyText = document.getElementById('feed-copy-paste');
    copyText.select();
    document.execCommand("Copy");
    window.getSelection().removeAllRanges();
  }

  handleOpen() {
    this.setState({isOpen: true});
    this.timeout = setTimeout(()=> {
      this.setState({isOpen: false});
    }, timeoutLength)
  }

  handleClose() {
    this.setState({ isOpen: false });
    clearTimeout(this.timeout);
  }

  renderButton() {
    const { isOpen } = this.state;
    
    return (
        <Popup
          trigger={<Button color='purple' onClick={this.copyFeedLink} labelPosition='right' icon='podcast' content='Copy Podcast Link' />}
          content='Copied to clipboard'
          on='click'
          open={this.state.isOpen}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          hideOnScroll
          position='right center'
        />
    );
  }

  render() {
    
    return (
      <div key={this.props.uploads}>
      <Header as='h1'>{this.props.channel}</Header>
      <Input
        id="feed-copy-paste" action={this.renderButton()}
        value={`http://localhost:3000/feed?uploads=${this.props.uploads || ''}&channel=${this.props.channel}`}
      /></div>
    );
  }
};
