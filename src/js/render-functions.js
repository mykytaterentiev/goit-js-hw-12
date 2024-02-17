export function renderMarkup(images) {
  const markup = images.map(galleryTemplate).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}