async function getImages() {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = import.meta.env.VITE_API_KEY;
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
    console.error("Сталася помилка при отриманні зображень:", error.message);
  }
}