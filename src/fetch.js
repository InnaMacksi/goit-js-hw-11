import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '34934818-9a58b99072f8bb0bce42e5818';
// let searchTerm = '';
let pageNumber = 1;
const perPage = 40;

export const getImage = (searchTerm, pageNumber) =>
  fetch(
    `${BASE_URL}${API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${pageNumber}`,
    { method: 'GET' }
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
// export const getImage = (searchTerm, pageNumber) =>
//   { return axios.get(
//     `${BASE_URL}${API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${pageNumber}`
//   )};
