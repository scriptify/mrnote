const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const NoteAPI = require('./api/api');
const { PUBLIC_PATH, SERVER_PORT, SERVER_IP } = require('../config/config.js');

const sendRes = (res, content) => {
  res.json(content);
}

module.exports = function(db) {

  const collection = db.collection('notes');

  const api = new NoteAPI(collection);

  const app = express();

  app.use(bodyParser.json());
  app.use(compression());
  app.use(cors());

  app.use(express.static(PUBLIC_PATH));

  app.post('/api/edit/:name/:id/:password/', (req, res) => {
    const { name, id, password } = req.params;
    const { newContent } = req.body;

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

  app.post('/api/insert/:name/:password', (req, res) => {
    const { name, password } = req.params;
    const { text } = req.body;

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
