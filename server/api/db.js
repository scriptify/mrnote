const credentials = require('credentials')();
const createNote = require('./Note');
const { NAME_TAKEN, NOT_FOUND, WRONG_PW, GREETING_NOTE_MSG, NO_ACCESS } = require('../../constants');

class MongoAccess {

  constructor(collection) {
    this.collection = collection;
  }

  edit(name, id, newContent) {
    return new Promise((resolve, reject) => {
      this.collection.updateOne(
        { name },
        { $pull: { notes: { id } } },
        (err, result) => {
          if(err)
            reject(err);

          this.insert(newContent, name)
            .then(resolve)
            .catch(reject);

        });
    });
  }

  create(name, password, isPublic) {

    return new Promise((resolve, reject) => {

      // Lookup if it already exists
      this.find(name)
        .then(doc => {
          reject(NAME_TAKEN);
        })
        .catch(err => {
          if(err !== NOT_FOUND)
            reject(err);

          credentials.hash(password)
            .then(pwHash => {
              this.collection.insert({
                name,
                pwHash,
                isPublic,
                notes: [createNote(GREETING_NOTE_MSG)]
              }, function(err, result) {
                if(err) {
                  reject(err);
                }
                resolve();
              });
            })
            .catch(reject);

        });

    });

  }

  insert(text, name) {

    return new Promise((resolve, reject) => {

      const note = createNote(text);

      this.collection.updateOne({
        name
      }, {
        $push: {
          notes: {
            $each: [ note ],
            $sort: { uploaded: 1 }
          }
        }
      }, function(err, result) {
        if(err) {
          reject(err);
        }
        resolve(note.id);
      });
    });

  }

  list() {
    return new Promise((resolve, reject) => {
      this.collection.find({}, {name: 1}).toArray((err, docs) => {
        if(err) {
          reject(err);
        }
        resolve(docs);
      });
    });
  }

  find(name, password = '') {
    return new Promise((resolve, reject) => {
      this.collection.findOne({name})
        .then(doc => {
          if(!doc)
            reject(NOT_FOUND);

          if(!JSON.parse(doc.isPublic)) {
            if(password === '' || !password)
              reject(NO_ACCESS);

            this.auth(name, password, doc.pwHash)
              .then(() => {
                delete doc.pwHash;
                delete doc._id;
                resolve(doc);
              })
              .catch(reject);
          } else {
            resolve(doc);
          }

        })
        .catch(reject);
    });
  }

  deleteBoard(name) {
    return new Promise((resolve, reject) => {
      this.collection.deleteOne({name})
        .then(resolve)
        .catch(reject);
    });
  }

  deleteNote(boardName, noteId) {
    return new Promise((resolve, reject) => {
      this.collection.updateOne({name: boardName}, {
        $pull: {
          notes: { id: noteId }
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  auth(name, password, pwHash) {

    return new Promise((resolve, reject) => {

      const verify = (hash) => {

        credentials.verify(hash, password)
          .then(isValid => {
            if(!isValid) {
              reject(WRONG_PW);
            }
            resolve();
          });
      }

      if(!pwHash) {
        this.collection.findOne({name})
          .then(doc => {
            if(!doc)
              reject(NOT_FOUND);
            verify(doc.pwHash);
          })
          .catch(reject);
      } else {
        verify(pwHash);
      }

    });

  }

}

module.exports = MongoAccess;
