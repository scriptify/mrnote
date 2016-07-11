const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const NoteAPI = require('./api/api');
const { PUBLIC_PATH, SERVER_PORT, SERVER_IP, CORS } = require('../config/config.js');

const sendRes = (res, content) => {
  sendJSONRes(res, CORS, content);
}

function sendJSONRes(res, jsonp, content) {
  if(jsonp)
    res.jsonp(content);
  else
    res.json(content);
}

module.exports = function(db) {

  const collection = db.collection('notes');

  const api = new NoteAPI(collection);

  const app = express();

  app.use(bodyParser.json());
  app.use(compression());

  app.use(express.static(PUBLIC_PATH));

  app.post('/api/test', (req, res) => {
    console.log('GOT it: /test ', req.body);
  });

  app.get('/api/edit/:name/:id/:password/:newContent', (req, res) => {
    const { name, id, password, newContent } = req.params;

    api.edit(name, id, password, newContent)
      .then(() => {
        sendRes(res, {msg: 'SUCCESS'});
      })
      .catch(err => {
        sendRes(res, {err});
      })
  });

  app.get('/api/create/:name/:password/:isPublic', (req, res) => {
    const { name, password, isPublic } = req.params;

    api.create(name, password, isPublic)
      .then(() => {
        sendRes(res, {msg: 'SUCCESS'});
      })
      .catch(err => {
        sendRes(res, {err});
      });
  });

  app.get('/api/insert/:text/:name/:password', (req, res) => {
    const { text, name, password } = req.params;
    api.insert(text, name, password)
      .then(id => {
        sendRes(res, {msg: 'SUCCESS', id});
      })
      .catch(err => {
        sendRes(res, {err});
      });
  });

  app.get('/api/list', (req, res) => {
    api.list()
      .then(items => {
        sendRes(res, items);
      })
      .catch(err => {
        sendRes(res, {err});
      });
  });

  app.get('/api/find/:name/:password?', (req, res) => {
    const { name, password } = req.params;
    api.find(name, password)
      .then(notes => {
        sendRes(res, notes);
      })
      .catch(err => {
        sendRes(res, {err});
      });
  });

  app.get('/api/delete/board/:name/:password', (req, res) => {
    const { name, password } = req.params;
    api.deleteBoard(name, password)
      .then(data => {
        sendRes(res, {msg: 'SUCCESS'});
      })
      .catch(err => {
        sendRes(res, {err});
      });
  });

  app.get('/api/delete/note/:name/:password/:noteId', (req, res) => {
    const { name, password, noteId } = req.params;
    api.deleteNote(name, password, noteId)
      .then(data => {
        sendRes(res, {msg: 'SUCCESS'});
      })
      .catch(err => {
        sendRes(res, {err});
      });
  });

  app.get('*', (req, res) => {
    res.sendFile(PUBLIC_PATH + '/index.html');
  });

  app.listen(SERVER_PORT, SERVER_IP, err => {
    if(err)
      return console.log('An error occured: ', err);

    console.log(`Server listening on ${SERVER_IP}:${SERVER_PORT}`);
  });
}
