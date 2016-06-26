import React, { Component } from 'react';
import icon from '../img/icon.png';
import del from '../img/delete.png'
import IconButton from './IconButton';
import Image from './Image';

export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let title = '';
    let onDelete = this.props.onDelete || (() => {});

    if(this.props.title) {
      title =
        <div
          className="title"
        >
          { this.props.title }
          {
            (this.props.onDelete  && this.props.deletable) ? (<IconButton className="delete-button" src={ del } onClick={ onDelete }/>) : ''
          }
        </div>;
    }

    return (
      <header>
        <div className="name">
          Notes
        </div>
        { title }
        <div className="logo">
          <Image src={ icon } />
        </div>
      </header>
    );
  }

}
