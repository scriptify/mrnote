const MongoAccess = require('./db');
const { INVALID_CREDENTIALS, MAX_CHARS } = require('../../config/constants');

class NotesAPI {

  constructor(collection) {
    this.db = new MongoAccess(collection);
  }

  mrnoteValidate(input) {
    return
      input
        .substring(0, MAX_CHARS)
        .replace(/[^0-9a-z]/gi, '-')
        .toLowerCase();
  }

  edit(name, id, password, newContent) {
    return new Promise((resolve, reject) => {
      this.db.auth(name, password)
        .then(() => {
          this.db.edit(name, id, newContent)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  create(name, password, isPublic) {

    return new Promise((resolve, reject) => {

      name = this.mrnoteValidate(name);
      password = this.mrnoteValidate(name);

      if(name === '' || password === '')
        reject(INVALID_CREDENTIALS)

      this.db.create(name, password, isPublic)
        .then(resolve)
        .catch(reject);

    });

  }

  insert(text, name, password) {

    return new Promise((resolve, reject) => {
      this.db.auth(name, password)
        .then(() => {
          this.db.insert(text, name)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });

  }

  list() {
    return new Promise((resolve, reject) => {
      this.db.list()
        .then(resolve)
        .catch(reject);
    });
  }

  find(name, password) {
    return new Promise((resolve, reject) => {
      this.db.find(name, password)
        .then(resolve)
        .catch(reject);
    });
  }

  deleteBoard(name, password) {
    return new Promise((resolve, reject) => {
      this.db.auth(name, password)
        .then(() => {
          this.db.deleteBoard(name)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  deleteNote(name, password, noteId) {
    return new Promise((resolve, reject) => {
      this.db.auth(name, password)
        .then(() => {
          this.db.deleteNote(name, noteId)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

}

module.exports = NotesAPI;
