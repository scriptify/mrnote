import es6Promise from 'es6-promise';
const promise = window.Promise || global.Promise || es6Promise.polyfill();

export default promise;
