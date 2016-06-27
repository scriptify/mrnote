const path = require('path');

module.exports = {
  PUBLIC_PATH: path.join(__dirname, '/client/build'),
  APP_PATH: path.join(__dirname, '/client/app'),
  IMG_PATH: path.join(__dirname, '/client/app/img'),
  DB_URL: 'mongodb://localhost:27017/noteboard',
  API_PATH: '/api/',
  SERVER_PORT: 443,
  SERVER_IP: '127.0.0.1',
  CORS: false
};
