import fetch from './fetch';

export default function fetchPost(url, json, jsonp = false) {
  return fetch(url, {
      jsonp,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: window.decodeURIComponent(JSON.stringify(json))
    });
};
