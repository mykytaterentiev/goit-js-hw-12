
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42272856-fbb9ecaa9aa7f62044da3b204';

export async function getImages(query, currentPage, PER_PAGE) {
  const url = `${BASE_URL}?key=${API_KEY}`;

  try {
    const { data } = await axios.get(url, {
      params: {
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        q: query,
        per_page: PER_PAGE,
        page: currentPage,
      },
    });
    return data;
  } catch (error) {
    console.error("Сталася помилка при отриманні зображень", error.message);
    throw error;
  }
}

let query = '';
let currentPage = 1;
let total = 0;
const PER_PAGE = 15;
