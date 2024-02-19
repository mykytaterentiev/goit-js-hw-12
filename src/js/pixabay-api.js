import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/';
const myApiKey = '42272856-fbb9ecaa9aa7f62044da3b204';

export async function getImage(imageName, page) {
  const response = await axios.get('api/', {
    params: {
      key: myApiKey,
      per_page: 15,
      page,
      q: imageName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response.data;
}