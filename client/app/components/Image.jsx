import React, { Component } from 'react';

export default class Image extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = {
      src: this.props.src,
      ...this.props
    };
    props.src = '/' + props.src;
    return (
      <img { ...props } />
    );
  }
}
