import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import 'whatwg-fetch'; // Fetch polyfill

import App from './components/App';
import Start from './components/Start';
import NoteBoard from './components/NoteBoard';

import './style/global.css';
import './style/header.css';
import './style/start.css';
import './style/note.css';
import './style/notes.css';
import './style/noteboard.css';
import './style/usernamechecker.css';
import './style/checkbox.css';
import './style/notification.css';
import './style/sharer.css';


import * as api from './api/api';

render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Start } />
        <Route path="/:username(/:password)" component={ NoteBoard } />
      </Route>
    </Router>,
    document.getElementById('app')
);
