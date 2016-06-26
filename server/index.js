const { DB_URL } = require('../config.js');
const { connect } = require('./util/mongo.js');
const server = require('./server');

connect(DB_URL)
  .then(db => {
    server(db);
  })
  .catch(err => {
    console.log('A server error occured: ', err);
  });
