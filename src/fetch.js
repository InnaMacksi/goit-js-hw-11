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
