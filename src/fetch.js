import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34934818-9a58b99072f8bb0bce42e5818';

  page = 1;
  q = null;

  getImage() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.q,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 40,
        page: this.page,
      },
    });
  }
}



// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = 'key=34934818-9a58b99072f8bb0bce42e5818';
// let searchTerm = '';
// let pageNumber = 1;
// const perPage = 40;

// export const getImage = (searchTerm, pageNumber) =>
//   fetch(
//     `${BASE_URL}${API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${pageNumber}`,
//     { method: 'GET' }
//   ).then(res => {
//     if (!res.ok) {
//       throw new Error(res.status);
//     }
//     return res.json();
//   });


// export const getImage = async (searchTerm, pageNumber) =>
//   { return axios.get(
//     `https://pixabay.com/api/?key=34934818-9a58b99072f8bb0bce42e5818&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${pageNumber}`
// )
// };
