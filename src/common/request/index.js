import axios from 'axios';
import { merge } from 'lodash';

import storage from '../storage';
import transformKeys from '../transformKeys';

// eslint-disable-next-line no-unused-vars
import { store, history } from '../../App';
// eslint-disable-next-line no-unused-vars
import { refreshToken } from '../../views/auth/auth.api';

const getHeaders = (headers) => {
  const user = storage.get('user');
  const defaultHeaders = {
    Accept: 'application/vnd.cia.v1+json',
    'Content-Type': 'application/vnd.cia.v1+json',
  };

  if (user && user.token) {
    merge(headers, { Authorization: `Bearer ${user.token.accessToken}` });
  }

  return merge({}, defaultHeaders, headers);
};

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    switch (error.response.status) {
      case 401:
        store.dispatch(refreshToken());
        break;
      case 404:
        history.push('/resource-not-found');
        break;
      case 500:
      case 504:
        history.push('/internal-server-error');
        break;
      default:
        break;
    }
    return Promise.reject(error);
  },
);

const request = {
  get: (url, headers = {}) => {
    return axios({
      method: 'GET',
      url,
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
        .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
  post: (url, payload, headers = {}, transform = true) => {
    return axios({
      method: 'POST',
      url,
      data: transform ? transformKeys.toSnakeCase(payload) : payload,
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
        .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
  patch: (url, payload, headers = {}, transform = true) => {
    return axios({
      method: 'PATCH',
      url,
      data: transform ? transformKeys.toSnakeCase(payload) : payload,
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
        .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
  put: (url, payload, headers = {}, transform = true) => {
    return axios({
      method: 'PUT',
      url,
      data: transform ? transformKeys.toSnakeCase(payload) : payload,
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
        .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
  delete: (url, headers = {}) => {
    return axios({
      method: 'DELETE',
      url,
      headers: getHeaders(headers),
      transformResponse: axios.defaults.transformResponse
        .concat((data) => transformKeys.toCamelCase(data)),
    });
  },
};

export default request;
