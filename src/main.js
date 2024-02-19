import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import error from './js/error.js';
import {
  hideLoader,
  hideLoadMore,
  showLoader,
  showLoadMore,
} from './js/render-functions.js';
import { getImage } from './js/pixabay-api.js';
import { imageTemplate } from './js/markup';

const form = document.querySelector('.search-form');
const pictures = document.querySelector('.gallery');
const btnNext = document.querySelector('.btn');

let currentPage = 1;
let currentQuery = '';
let availablePages = 0;

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', searchImage);
btnNext.addEventListener('click', loadMore);

async function searchImage(evt) {
  evt.preventDefault();
  const image = evt.target.elements.image.value.trim();
  pictures.innerHTML = '';
  hideLoadMore();
  try {
    if (image === '') {
      error.emptySearch();
      return;
    }
    showLoader();
    currentQuery = image;
    currentPage = 1;
    const data = await getImage(currentQuery, currentPage);
    if (data.totalHits > 0) {
      const markup = data.hits.map(imageTemplate).join('\n\n');
      pictures.insertAdjacentHTML('beforeend', markup);
      const element = pictures.firstElementChild.getBoundingClientRect();
      window.scrollBy({ top: element.height, behavior: 'smooth' });
      gallery.refresh();
      showLoadMore();
      form.reset();
      availablePages = Math.ceil(data.totalHits / 15);
    } else {
      pictures.innerHTML = '';
      error.noImages();
    }
  } catch (err) {
    error.errorMessage();
  } finally {
    hideLoader();
  }
}

async function loadMore() {
  try {
    showLoader();
    currentPage += 1;
    const data = await getImage(currentQuery, currentPage);
    const markup = data.hits.map(imageTemplate).join('\n\n');
    pictures.insertAdjacentHTML('beforeend', markup);
    const element = pictures.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: element.height, behavior: 'smooth' });
    gallery.refresh();
    if (currentPage === availablePages) {
      error.endOfSearch();
      hideLoadMore();
    }
  } catch (err) {
    error.errorMessage();
  } finally {
    hideLoader();
  }
}