export function galleryTemplate({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<a class='gallery-link' href='${largeImageURL}'><img class='gallery-image' src='${webformatURL}' alt='${tags}'/>
  <div class='gallery-review'>
  <div class='gallery-review-item'><b>Likes</b> <span>${likes}</span></div>
  <div class='gallery-review-item'><b>Views</b> <span>${views}</span></div>
  <div class='gallery-review-item'><b>Comments</b> <span>${comments}</span></div>
  <div class='gallery-review-item'><b>Downloads</b> <span>${downloads}</span></div>
  </div></a>
    `;
}

export let gallery = new SimpleLightbox('.gallery a', {
  showCounter: false,
  captionDelay: 250,
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

