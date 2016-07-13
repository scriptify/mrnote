export default function fetchPost(url, json, cors) {

  return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(json)
    });
};
