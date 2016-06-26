import React, { Component } from 'react';
import check from '../img/confirm.png';
import no from '../img/no.png';
import Image from './IconButton';

export default class UsernameChecker extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let icon = '';
    if(this.props.available === 0)
      icon = <Image className="checker-icon" src={ no } />
    else if(this.props.available === 1)
      icon = <Image className="checker-icon" src={ check } />
    else if(this.props.available === -1)
      icon = <Image className="checker-icon" src={ loading } />

    return (
      <div className="username-checker">
        <input
          type="text"
          { ...this.props }
        ></input>
        { icon }
      </div>
    );
  }
}
