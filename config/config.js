const path = require('path');

function getEnvironment() {
  if(typeof window !== 'undefined') {
    return ENVIRONMENT;
  } else {
    return (process.env.npm_lifecycle_event === 'dev') ? 'development' : 'production';
  }
}

const ENVIRONMENT = getEnvironment();

console.log('Config in ' + ENVIRONMENT + ' mode');

module.exports = {
  PUBLIC_PATH: path.join(__dirname, '../client/build'),
  APP_PATH: path.join(__dirname, '../client/app'),
  IMG_PATH: path.join(__dirname, '../client/app/img'),
  CONFIG_PATH: path.join(__dirname, '.'),
  DB_URL: 'mongodb://localhost:27017/noteboard',
  API_PATH: '/api/',
  SERVER_PORT: (ENVIRONMENT === 'development') ? 3000 : 8080,
  SERVER_IP: '127.0.0.1',
  CORS: (ENVIRONMENT === 'development'),
  IS_API_SERVER_EXTERNAL: (ENVIRONMENT === 'development')
};
