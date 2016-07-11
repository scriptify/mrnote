import fetch from '../util/fetch';
import fetchPost from '../util/fetchPost';
import promise from '../util/Promise';
import { SERVER_ERROR } from '../../../config/constants';
import { API_PATH, CORS, SERVER_PORT, SERVER_IP, IS_API_SERVER_EXTERNAL } from '../../../config/config.js';

function apiRequest(url, type = 'GET', postBody = {}) {
  var reqUrl = API_PATH + url;

  if(IS_API_SERVER_EXTERNAL)
    reqUrl = `http://${SERVER_IP}:${SERVER_PORT}${reqUrl}`;

    console.log(reqUrl)
  return request(reqUrl, type, postBody, SERVER_ERROR, CORS);
}

function request(url, type, postBody, error, jsonp) {

  if(type === 'POST') {

    return new promise((resolve, reject) => {
      fetchPost(url, postBody, jsonp)
        .then(res => {
          return res.json();
        })
        .then(json => {
          if(json.err)
            reject(json.err);
          resolve(json);
        })
        .catch(err => {
          reject(error);
        });
    });

  } else if(type === 'GET') {

    return new promise((resolve, reject) => {
      fetch(url, {jsonp})
        .then(res => {
          return res.json();
        })
        .then(json => {
          if(json.err)
            reject(json.err);
          resolve(json);
        })
        .catch(err => {
          reject(error);
        });
    });

  } else {
    throw new Error('Invalid request type!');
  }

}

export function testPost(msg) {
  const url = 'test';
  return apiRequest(url, 'POST', msg);
}

window.testPost = testPost;

export function create(name, password, isPublic) {
  const url = `create/${name}/${password}/${isPublic}`;
  return apiRequest(url);
}

export function insert(text, name, password) {
  text = encodeURIComponent(text);
  const url = `insert/${text}/${name}/${password}`;
  return apiRequest(url);
}

export function list() {
  return apiRequest('list');
}

export function find(name, password = '') {
  const url = `find/${name}/${password}`;
  return apiRequest(url);
}

export function edit(name, id, password, newContent) {
  newContent = encodeURIComponent(newContent);
  const url = `edit/${name}/${id}/${password}/${newContent}`;
  return apiRequest(url);
}

export function deleteBoard(name, password) {
  const url = `delete/board/${name}/${password}`;
  return apiRequest(url);
}

export function deleteNote(name, password, id) {
  const url = `delete/note/${name}/${password}/${id}`;
  return apiRequest(url);
}

export function isUsernameAvailable(username) {
  return new Promise((resolve, reject) => {
    list()
      .then(users => {
        resolve(users.filter(user => user.name === username).length === 0);
      })
      .catch(reject);
  });
}
