const path = require('path');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

function getEnvironment() {
  if(typeof window !== 'undefined') {
    return ENVIRONMENT;
  } else {
    return (process.env.npm_lifecycle_event === 'dev') ? DEVELOPMENT : PRODUCTION;
  }
}

const ENV = getEnvironment();

console.log('Config in ' + ENV + ' mode');

module.exports = {
  PUBLIC_PATH: path.join(__dirname, '../client/build'),
  APP_PATH: path.join(__dirname, '../client/app'),
  IMG_PATH: path.join(__dirname, '../client/app/img'),
  CONFIG_PATH: path.join(__dirname, '.'),
  DB_URL: 'mongodb://localhost:27017/noteboard',
  API_PATH: '/api/',
  SERVER_PORT: (ENV === DEVELOPMENT) ? 3000 : 8080,
  SERVER_IP: '127.0.0.1',
  CORS: (ENV === DEVELOPMENT)
};
