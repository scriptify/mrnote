import React, { Component } from 'react';

export default class ContentEditable extends Component {

  elem;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.elem.textContent = this.props.content;
  }

  render() {
    return (
      <div
        ref={ elem => this.elem = elem }
        contentEditable={ this.props.editable }
        onInput={this.onChange.bind(this)}
        onBlur={this.onChange.bind(this)}
      ></div>
    );
  }

  onChange(e) {
    this.props.onChange(this.elem.textContent);
  }

}
