import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import errorIcon from './img/bi_x-octagon.svg';
import axios from 'axios';
import { getImages } from './js/pixabay-api';
import { galleryTemplate } from './js/render-functions';
import { onFormSubmit } from './js/pixabay-api';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.btn-load-more'),
};

let query = '';
let currentPage = 1;
let total = 0;
const PER_PAGE = 15;


let gallery = new SimpleLightbox('.gallery a', {
  showCounter: false,
  captionDelay: 250,
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

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