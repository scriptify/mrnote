import promise from './Promise';

let fetch = require('fetch-ponyfill')({
  Promise: promise
});

fetch = window.fetch || self.fetch || fetch;

export default function(url, options = {}) {

    if(options.jsonp) {
      return fetch(url, {
        ...options,
        mode: options.jsonp ? 'no-cors' : 'cors'
      });
    }

    return fetch(url, options);
};
