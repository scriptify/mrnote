import fetch from './fetch';

export default function fetchPost(url, json, jsonp = false) {

  return fetch(url, {
      jsonp,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(json)
    });
};
