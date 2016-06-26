const { MongoClient } = require('mongodb');

function connect(url) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(db);
    });
  });
};

module.exports = {
  connect
}
