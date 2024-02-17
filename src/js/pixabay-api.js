
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42132229-e88b92984f0d2a7001cb07c65';

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
