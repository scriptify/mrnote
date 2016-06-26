const path = require('path');

module.exports = {
  PUBLIC_PATH: path.join(__dirname, '/client/build'),
  APP_PATH: path.join(__dirname, '/client/app'),
  IMG_PATH: path.join(__dirname, '/client/app/img'),
  DB_URL: `${(process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/')}noteboard`,
  API_PATH: '/api/', 
  SERVER_PORT: process.env.OPENSHIFT_NODEJS_PORT || 3000,
  SERVER_IP: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  CORS: true
};
