import promise from './Promise';

let fetch = require('fetch-ponyfill')({
  Promise: promise
});

fetch = window.fetch || self.fetch || fetch;

export default fetch;
