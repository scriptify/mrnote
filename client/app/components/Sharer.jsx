import React, { Component } from 'react';

import Image from './Image';

import icon from '../img/icon.png';
import share from '../img/share.png';
import close from '../img/no.png';

import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

export default class Sharer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  handleToggle(e) {
    this.setState({
      show: !this.state.show
    });
  }

  render() {

    const {
      FacebookShareButton,
      GooglePlusShareButton,
      LinkedinShareButton,
      TwitterShareButton,
      PinterestShareButton,
      VKShareButton
    } = ShareButtons;

    const FacebookIcon = generateShareIcon('facebook');
    const TwitterIcon = generateShareIcon('twitter');
    const GooglePlusIcon = generateShareIcon('google');
    const LinkedinIcon = generateShareIcon('linkedin');
    const PinterestIcon = generateShareIcon('pinterest');
    const VKIcon = generateShareIcon('vk');

    const title = 'mrnote - notes everywhere, for everyone';
    const description = 'mrnote - your notes always available, on every device, for everyone. It\'s that easy. Create a new noteboard now, it will take you 2 seconds!';
    const url = 'http://www.mrnote.xyz';
    const img = url + '/' + icon;

    let content = '';
    let navIcon = share;


    if(this.state.show) {
      navIcon = close;
      content =
        <div>
          <FacebookShareButton className="icon" children={ <div><FacebookIcon /></div> } description={ description } title={ title } url={ url } />
          <GooglePlusShareButton className="icon" children={ <div><GooglePlusIcon /></div> } description={ description } title={ title } url={ url } />
          <LinkedinShareButton className="icon" children={ <div><LinkedinIcon /></div> } description={ description } title={ title } url={ url } />
          <TwitterShareButton className="icon" children={ <div><TwitterIcon /></div> } description={ description } title={ title } url={ url } />
          <PinterestShareButton className="icon" media={ img } children={ <div><PinterestIcon /></div> } description={ description } title={ title } url={ url } />
          <VKShareButton className="icon" children={ <div><VKIcon /></div> } description={ description } title={ title } url={ url } />
        </div>;
    }



    return (
      <div className="sharer">
        <Image className="share-icon" src={ navIcon } onClick={ this.handleToggle.bind(this) }/>
        { content }
      </div>
    );
  }

}
