import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import { NAME_TAKEN, NOT_FOUND, WRONG_PW, NO_ACCESS, SERVER_ERROR, INVALID_CREDENTIALS, FORM_FIELDS_MISSING, PASSWORD_REQUIRED, TUTORIAL, APP_URL } from '../../../config/constants';
import Notification from './Notification';
import Image from './Image';
import Auth from './Auth';
import uiStore from '../stores/UiStore';
import store from '../stores/NoteBoardStore';
import notFound from '../img/notfound.png';
import confirm from '../img/confirm.png';

@observer
export default class AppNotification extends Component {
  constructor(props) {
    super(props);
  }

  mapConstantToContent(constant) {

    switch(constant) {

      case NAME_TAKEN:
        return {
          content: 'Sorry, this name is already taken',
          lock: false,
          fixed: false
        };

      case NOT_FOUND:
        return {
          content: <div><p>Could not find the board you are searching!</p><Image src={ notFound } /></div>,
          lock: true,
          fixed: true
        };

      case WRONG_PW:
        return {
          content:
            <div>
              <p>The key you entered is wrong.</p>
            </div>,
          lock: true,
          fixed: true
        };

      case NO_ACCESS:
        return {
          content: <Auth onSubmit={pw => {
            browserHistory.push(`/${store.name}/${pw}/`);
            window.location.reload(); // Why is this needed here?
          }}/>,
          lock: true,
          fixed: true
        };

      case SERVER_ERROR:
        return {
          content: 'A server error occured. Please try again later.',
          lock: true,
          fixed: true
        };

      case INVALID_CREDENTIALS:
        return {
          content: 'The credentials you specified are invalid!',
          lock: true,
          fixed: false
        };

      case FORM_FIELDS_MISSING:
        return {
          content: 'Fill in all form fields!',
          lock: false,
          fixed: false
        };

      case PASSWORD_REQUIRED:
        return {
          content: <Auth onSubmit={pw => {
            store.password = pw;
            uiStore.notification.show = false;
          }}/>,
          lock: true,
          fixed: true
        };

      case TUTORIAL:
        return {
          content:
            <div className="tutorial">
              <p className="description">
                Use this URL to have write access:
              </p>
              <div contentEditable="true" className="url">
                { `${APP_URL}/${store.name}/${store.password}` }
              </div>
              <p className="description">
                Use this URL to have read-only access:
              </p>
              <div contentEditable="true" className="url">
                { `${APP_URL}/${store.name}/` }
              </div>
              <Image src={ confirm } onClick={() => {
                browserHistory.push(`/${store.name}/${store.password}/`);
                window.location.reload();
              }}/>
            </div>,
            lock: true,
            fixed: true
        };

      default:
        return {
          content: 'An unknown error occured :(',
          lock: true,
          fixed: true
        };
    }
  }

  render() {

    if(!uiStore.notification.show)
      return <div></div>;

    const notification = this.mapConstantToContent(uiStore.notification.type);

    return (
      <Notification
        lock={ notification.lock }
        fixed={ notification.fixed }
        onClose={() => {
          uiStore.notification.show = false;
        }}
        hideAfter={ notification.lock ? undefined : 2000 }
      >
        { notification.content }
      </Notification>
    );
  }
}
