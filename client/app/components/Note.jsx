import React, { Component } from 'react';
import { observer } from 'mobx-react';

import IconButton from './IconButton';
import ContentEditable from './ContentEditable';
import confirm from '../img/confirm.png';
import edit from '../img/edit.png';
import del from '../img/delete.png';

@observer
export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  handleEditStart(e) {
    this.setState({
      ...this.state,
      editing: true
    });
  }

  handleContentChange(newContent) {
    this.props.onChange();
    this.props.note.text = newContent;
  }

  handleContentConfirm(e) {
    this.props.onConfirmChange();
    this.setState({
      ...this.state,
      editing: false
    });
  }

  render() {

    let text = <p>{ this.props.note.text }</p>;
    let actionButton =
      <IconButton hide={ !this.props.editable } src={ edit } className="action-button" onClick={this.handleEditStart.bind(this)}/>;

    if(this.state.editing) {
      actionButton =
        <div
          onClick={this.handleContentConfirm.bind(this)}
        >
          <IconButton hide={ !this.props.editable } src={ confirm } className="action-button" />
        </div>;

      text =
        <ContentEditable
          content={ this.props.note.text + '' }
          onChange={ this.handleContentChange.bind(this) }
          editable={ this.state.editing }
        />;
    }

    return (
      <div
        className="note"
      >
        <div className="button-bar">
          { actionButton }
          <IconButton onClick={ this.props.onDelete } hide={ !this.props.editable } src={ del } className="action-button" />
        </div>
        { text }
      </div>
    );
  }
}
