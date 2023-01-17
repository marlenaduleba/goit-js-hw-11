import Notiflix, { Notify } from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import InfiniteScroll from 'infinite-scroll';

import { getPhotos, pageReset } from './fetchPhotos';
import { page, limit, pageDefault, baseUrl, myKey } from './fetchPhotos';
import { icons } from './icons';

const form = document.querySelector('#search-form');
const input = document.querySelector('.search-form__input');
const gallery = document.querySelector('.gallery');

Notiflix.Notify.init({
  position: 'center-center',
  // opacity: 1,
  // timeout: 3000,
  failure: {
    background: `#FF5733`,
  },
  success: {
    background: `#00BC5D`,
  },
});

const lightboxOptions = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionDelay: 250,
};

let lightbox = new simpleLightbox(`.gallery a`, lightboxOptions);

let infScroll = new InfiniteScroll(gallery, {
  path: function () {
    return `${baseUrl}?key=${myKey}&q=${input.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.pageIndex}`;
  },
  responseBody: 'json',
  history: false,
});

form.addEventListener(`submit`, makeGallery);
infScroll.on(`load`, loadMore);

async function makeGallery(event) {
  const searchValue = input.value.trim();
  event.preventDefault();
  pageReset();
  clear();
  try {
    const photos = await getPhotos(searchValue);
    console.log(photos);
    if (searchValue === '') {
      clear();
      Notify.failure('You cannot search by empty field, try again.');
    } else if (photos.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderPhotos(photos.data.hits);
      infScroll.loadNextPage();
      lightbox.refresh();
      Notify.success(`Hooray! We found ${photos.data.totalHits} images.`);
    }
  } catch (error) {
    console.log(error);
  }
}

function renderPhotos(photos) {
  const markup = photos
    .map(photo => {
      return `<div class="photo-card">
        <a class="gallery__link" href="${photo.largeImageURL}"><img class="gallery__image" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>${icons.likes}</b>${photo.likes}
          </p>
          <p class="info-item">
            <b>${icons.views}</b>${photo.views}
          </p>
          <p class="info-item">
            <b>${icons.comments}</b>${photo.comments}
          </p>
          <p class="info-item">
            <b>${icons.downloads}</b>${photo.downloads}
          </p>
        </div>
      </div>`;
    })
    .join(``);

  gallery.insertAdjacentHTML(`beforeend`, markup);
}

function clear() {
  gallery.innerHTML = '';
}

async function loadMore() {
  const photos = await getPhotos(input.value);
  renderPhotos(photos.data.hits);
  lightbox.refresh();
}

infScroll.on('last', function () {
  console.log('last page');
  Notify.failure("We're sorry, but you've reached the end of search results.");
});
