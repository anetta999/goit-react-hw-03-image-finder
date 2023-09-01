import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImagesByQuery(query, page) {
  const params = new URLSearchParams({
    key: '38324496-84226fc1fa5e9d21681883b31',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });
  const response = await axios.get(`?${params}`);
  return response.data;
}
