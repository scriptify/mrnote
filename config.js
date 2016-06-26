const path = require('path');

module.exports = {
  PUBLIC_PATH: path.join(__dirname, '/client/build'),
  APP_PATH: path.join(__dirname, '/client/app'),
  IMG_PATH: path.join(__dirname, '/client/app/img'),
  DB_URL: 'mongodb://localhost:27017/noteboard',
  API_PORT: 3000,
  API_URL: 'http://localhost',
  CORS: true
};
