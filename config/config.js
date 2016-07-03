const path = require('path');

const TARGET = process.env.npm_lifecycle_event;

module.exports = {
  PUBLIC_PATH: path.join(__dirname, '../client/build'),
  APP_PATH: path.join(__dirname, '../client/app'),
  IMG_PATH: path.join(__dirname, '../client/app/img'),
  CONFIG_PATH: path.join(__dirname, '.'),
  DB_URL: 'mongodb://localhost:27017/noteboard',
  API_PATH: '/api/',
  SERVER_PORT: (TARGET === 'dev') ? 3000 : 8080,
  SERVER_IP: '127.0.0.1',
  CORS: (TARGET === 'dev'),
  IS_API_SERVER_EXTERNAL: (TARGET === 'dev')
};
