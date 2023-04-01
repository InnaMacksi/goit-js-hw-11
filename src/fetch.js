const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '34934818-9a58b99072f8bb0bce42e5818';
let searchTerm = '';

export const getImage = () =>
  fetch(
    `${BASE_URL}${API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`,
    { method: 'GET' }
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });

