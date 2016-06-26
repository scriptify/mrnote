import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';
import NoteBoard from './NoteBoard';
import Image from './Image';
import AppNotification from './AppNotification';
import Notification from './Notification';
import uiStore from '../stores/UiStore';
import loading from '../img/loading.svg';



@observer
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  handleNotificationClose() {
    uiStore.notification.show = false;
  }

  render() {

    let notification = '';

    if(uiStore.isLoading) {
      notification = (
        <Notification
          lock={ uiStore.lockLoading }
          fixed="true"
        >
          <Image src={ loading } />
        </Notification>
      );
    }

    return (
      <div>

        <AppNotification />
        { this.props.children }
        { notification }
      </div>
    );
  }

}
