import queryString from 'query-string';
import axios from './axios';

const getList = (token, query = {}) =>
  axios
    .get(`/people?${queryString.stringify(query)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);

const get = (token, id) =>
  axios
    .get(`/people/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);


const add = (token, person) =>
  axios
    .post('/people', person,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const replace = (token, id, person) =>
  axios
    .put(`/people/${id}`, person,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const peopleApi = {
  getList,
  get,
  add,
  replace
};
export default peopleApi;
