import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import errorIcon from './img/bi_x-octagon.svg';
import axios from 'axios';
import { getImages } from './js/pixabay-api';
import { galleryTemplate } from './js/render-functions';


const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.btn-load-more'),
};

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

function renderMarkup(images) {
  const markup = images.map(galleryTemplate).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

async function loadMore() {
  toggleLoader();
  toggleBtnLoadMore();
  currentPage += 1;
  const data = await getImages();
  renderMarkup(data.hits);
  toggleBtnLoadMore();
  checkBtnStatus();
  toggleLoader();
  scrollByGalleryCardHeight();
}

function checkBtnStatus() {
  const maxPage = Math.ceil(total / PER_PAGE);
  const isLastPage = maxPage <= currentPage;
  if (isLastPage) {
    refs.btnLoadMore.classList.add('hidden');
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      messageSize: '16px',
      timeout: 2000,
    });
  }
}

function toggleLoader() {
  refs.loader.classList.toggle('hidden');
}

function toggleBtnLoadMore() {
  refs.btnLoadMore.classList.toggle('hidden');
}

function scrollByGalleryCardHeight() {
  const galleryCard = document.querySelector('.gallery-link');
  if (galleryCard) {
    const cardRect = galleryCard.getBoundingClientRect();
    const cardHeight = cardRect.height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } else {
    return;
  }
}