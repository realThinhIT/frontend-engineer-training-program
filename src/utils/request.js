import config from '../config';

global.fetch = window.fetch || global.fetch;

export default (url = '/', method = 'GET', body = undefined, queryStrings = {}) => {
  let headers = {
    'Content-Type': 'application/json'
  };

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  const query = Object.keys({
    ...queryStrings
  })
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryStrings[key])}`)
    .join('&');

  let bodyContent;
  if (body !== undefined) {
    bodyContent = JSON.stringify(body);
  }

  return fetch(`${config.API_BASE_URL}${url}${url.indexOf('?') >= 0 ? '&' : '?'}${query}`, {
    headers,
    method,
    body: bodyContent,
    mode: 'cors'
  });
};
