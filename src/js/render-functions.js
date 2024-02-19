const spanLoader = document.querySelector('.loader');
const btnNext = document.querySelector('.btn');

export function showLoader() {
  spanLoader.style.display = 'block';
}
export function hideLoader() {
  spanLoader.style.display = 'none';
}
export function hideLoadMore() {
  btnNext.style.display = 'none';
}
export function showLoadMore() {
  btnNext.style.display = 'block';
}