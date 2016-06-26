import React, { Component } from 'react';
import Image from './Image';

export default class IconButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let className = 'icon-button';
    let elem =
      <div>
        <Image src={ this.props.src } { ...this.props } className=""/>
      </div>;

    if(this.props.className) {
      className += ` ${this.props.className}`;
    }

    if(this.props.hide)
      elem = undefined;

    return (
      <div className={ this.props.hide ? '' : className }>
        { elem }
      </div>
    );
  }

}
