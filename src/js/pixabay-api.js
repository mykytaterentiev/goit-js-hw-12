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

refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', loadMore);

async function onFormSubmit(event) {
  event.preventDefault();
  refs.btnLoadMore.classList.add('hidden');
  if (query === event.target.elements.query.value.trim()) {
    event.target.reset();
    toggleBtnLoadMore();
    return;
  } else {
    query = event.target.elements.query.value.trim();
  }
  currentPage = 1;
  refs.gallery.textContent = '';
  toggleLoader();

  try {
    const data = await getImages();
    if (!query) {
      iziToast.warning({
        message: 'Sorry, you forgot to enter a search term. Please try again!',
        position: 'topRight',
        messageSize: '16px',
        timeout: 2000,
      });
      toggleLoader();
      return;
    } else if (parseInt(data.totalHits) > 0) {
      toggleBtnLoadMore();
      renderMarkup(data.hits);
      total = data.totalHits;
      checkBtnStatus();
      toggleLoader();
    } else {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: '16px',
        iconColor: 'white',
        iconUrl: errorIcon,
        color: 'white',
        timeout: 2000,
      });
      toggleLoader();
    }
  } catch (error) {
    iziToast.error({
      message: 'Error',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      messageSize: '16px',
      iconColor: 'white',
      iconUrl: errorIcon,
      color: 'white',
      timeout: 2000,
    });
    toggleLoader();
  }
  event.target.reset();
}