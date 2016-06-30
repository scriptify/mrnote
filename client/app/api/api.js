import fetch from '../util/fetch';
import promise from '../util/Promise';
import fetchJsonp from 'fetch-jsonp';
import { SERVER_ERROR } from '../../../config/constants';
import { API_PATH, CORS, SERVER_PORT, SERVER_IP, IS_API_SERVER_EXTERNAL } from '../../../config/config.js';

function apiRequest(url) {
  var reqUrl = API_PATH + url;
  if(IS_API_SERVER_EXTERNAL)
    reqUrl = `http://${SERVER_IP}:${SERVER_PORT}${reqUrl}`;
  return request(reqUrl, SERVER_ERROR, CORS);
}

function request(url, error, jsonp) {

  const fetchFn = jsonp ? fetchJsonp : fetch;

  return new promise((resolve, reject) => {
    fetchFn(url)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if(json.err)
          reject(json.err);
        resolve(json);
      })
      .catch(err => {
        console.log(err);
        reject(error);
      });
  });

}

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
