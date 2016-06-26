import { observable } from 'mobx';
import { browserHistory } from 'react-router';

import Notification from '../models/Notification';

import { isUsernameAvailable, create } from '../api/api';

import { TUTORIAL } from '../../../constants';

import notesStore from './NoteBoardStore';

class UiStore {
  @observable isLoading = false;
  @observable notification = new Notification();

  isUsernameAvailable(username) {
    return isUsernameAvailable(username);
  }

  createBoard(username, password, isPublic) {
    this.setLoading(true);
    create(username, password, isPublic)
      .then(res => {
        notesStore.name = username;
        notesStore.password = password;
        this.unsetLoading();
        this.setNotification(TUTORIAL);
      })
      .catch(err => {
        this.unsetLoading();
        this.setNotification(err);
      });
  }

  setNotification(constant) {
    this.notification.type = constant;
    this.notification.show = true;
  }

  setLoading(shouldLock) {
    this.isLoading = true;
    this.lockLoading = shouldLock;
  }

  unsetLoading() {
    this.isLoading = false;
  }

}

const store = new UiStore();

export default store;
