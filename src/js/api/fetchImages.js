import axios from 'axios';
import { BASE_URL } from '../constants/base-url';

export const fetchImagesParams = {
  key: '42272856-fbb9ecaa9aa7f62044da3b204',
  image_type: 'photo',
  orientation: 'horizontal',
  safeSearch: true,
  per_page: 15,
  q: undefined,
  page: 1,
};

export async function fetchImages(q = 'flower', page = 20) {
  fetchImagesParams.q = q;
  fetchImagesParams.page = page;
  return axios.get(BASE_URL, { params: { ...fetchImagesParams, page, q } });
}