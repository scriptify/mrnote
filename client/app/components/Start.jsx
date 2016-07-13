import React, { Component } from 'react';
import Checkbox from './Checkbox';
import Header from './Header';
import UsernameChecker from './UsernameChecker';
import uiStore from '../stores/UiStore';

import { FORM_FIELDS_MISSING, NAME_TAKEN } from '../../../config/constants';

export default class Start extends Component {

  currUsernameCheck = ''

  constructor(props) {
    super(props);
    this.state = {
      usernameAvailable: undefined,
      username: '',
      password: '',
      isPublic: true,
    };
  }

  checkAvailability(username) {
    this.currUsernameCheck = username;
    uiStore.isUsernameAvailable(username)
      .then(isAvailable => {

        if(this.currUsernameCheck === username) {
          this.setState({
            ...this.state,
            usernameAvailable: isAvailable ? 1 : 0
          });
        }

      })
      .catch(err => {
        uiStore.setNotification(err);
      });
  }

  handleCreate(e) {
    e.preventDefault();

    if(this.state.username === '' || this.state.password === '') {
      // ERROR!
      uiStore.setNotification(FORM_FIELDS_MISSING);
      return;
    }

    if(this.state.usernameAvailable !== 1) {
      // ERROR
      uiStore.setNotification(NAME_TAKEN);
      return;
    }

    uiStore.createBoard(this.state.username, this.state.password, this.state.isPublic);
  }

  handleUserNameChange(e) {
    const val =
      e.target.value
        .replace(/[^0-9a-z]/gi, '-')
        .toLowerCase();

    this.setState({
      ...this.state,
      username: val
    }, () => {
      this.checkAvailability(this.state.username);
    });
  }

  handlePasswordChange(e) {

    const val =
      e.target.value
        .replace(/[^0-9a-z]/gi, '-')
        .toLowerCase();
    
    this.setState({
      ...this.state,
      password: val
    });
  }

  handlePublicChange() {
    this.setState({
      ...this.state,
      isPublic: !this.state.isPublic
    });
  }

  render() {

    return (
      <div>
        <Header title="Create a board!" />
        <div className="start">
          <form>

            <UsernameChecker value={ this.state.username } placeholder="Name of your new board..." className="text-field"
              available={ (this.state.username.length > 0) ? this.state.usernameAvailable : undefined }
              onChange={ this.handleUserNameChange.bind(this) }
            />

            <input value={ this.state.password } placeholder="Your key..." type="text" className="text-field margin"
              onChange={ this.handlePasswordChange.bind(this) }
            ></input>

            <Checkbox checked={ this.state.isPublic } text="Make public" onChange={ this.handlePublicChange.bind(this) }/>
            <input type="submit" value="Create!" className="margin" onClick={ this.handleCreate.bind(this) }></input>

          </form>
        </div>
      </div>
    );
  }

}
