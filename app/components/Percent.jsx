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
        <Button onClick={()=>{window.location.href = `bitbucket/${this.props.video.snippet.resourceId.videoId}.mp3`}} size="small">Download Audio</Button>
      </Transition>
    );
  }

  showPercentageOrDownloadButton() {
    let contentToDisplay = this.props.video.done ?
      this.renderDownloadButton() :
      this.renderPercentage();

    return contentToDisplay;
  }
    // total = this.props.total !== "NaN%" ? this.props.total : 'loading...'
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
    // <span className="percent">{total}</span></div>
}



// const downloadOrPercent = () => {
//   if (props.video.done) {
//     return (
//       <DownloadButton
//         link={props.video.snippet.resourceId.videoId}
//         channel={props.channel}
//       />
//     )
//   } else if (props.video.percent) {
//     if (props.video.percent === 100) {
//       return (
//         <DownloadButton
//           link={props.video.snippet.resourceId.videoId}
//           channel={props.channel}
//         />
//       )
//     }
//     let total = Math.floor(props.video.percent);
//     return (<Percent
//       total={total}
//     />);
//   } else {
//     return (
//       <Percent
//         total={0}
//       />
//     );
//   }
// }