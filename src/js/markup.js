export function imageTemplate({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `<li class="gallery-item"><a href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" /></a>
  <div class="description"> <p>Likes <span>${likes}</span></p><p>Views <span>${views}</span></p><p>Comments <span>${comments}</span></p><p>Downloads <span>${downloads}</span></p></div></li>`;
  }