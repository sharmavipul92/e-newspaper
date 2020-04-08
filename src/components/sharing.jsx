import React, { Component } from 'react';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share';

class Sharing extends Component {
  state = {  }
  render() { 
    return (
      <div className='my-3'> 
        <WhatsappShareButton className='ml-1' url={this.props.imageLink}>
          <WhatsappIcon size={this.props.screen === 'sm' ? 24 : 32} round={false} />
        </WhatsappShareButton>
        <FacebookShareButton className='ml-1' url={this.props.imageLink}>
          <FacebookIcon size={this.props.screen === 'sm' ? 24 : 32} round={false} />
        </FacebookShareButton>
      </div>
    );
  }
}
 
export default Sharing;