import Notiflix, { Notify } from 'notiflix';
import { getPhotos, pageReset } from './fetchPhotos';
import { page, limit, pageDefault } from './fetchPhotos';
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('#search-form');
const input = document.querySelector('.search-form__input');
const searchButton = document.querySelector('.search-form__btn');
const loadButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let lightbox;

const lightboxOptions = {
  captions: true,
  captionSelector: "img",
  captionType: "attr",
  captionsData: "alt",
  captionDelay: 250,
}

form.addEventListener(`submit`, makeGallery);
loadButton.addEventListener(`click`, loadMore);

async function makeGallery(event) {
  event.preventDefault();
  pageReset();
  clear();
  try {
    const photos = await getPhotos(input.value);
    console.log(photos);
    if (photos.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
        renderPhotos(photos.data.hits);
        lightbox = new SimpleLightbox(`.gallery a`, lightboxOptions);
    };
    
  } catch (error) {
    console.log(error);
  }
}

function renderPhotos(photos) {
  const markup = photos
    .map(photo => {
      return `<div class="photo-card">
        <a href="${photo.largeImageURL}"><img class="gallery__image" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${photo.likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${photo.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${photo.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${photo.downloads}</b>
          </p>
        </div>
      </div>`;
    })
    .join(``);

  gallery.insertAdjacentHTML(`beforeend`, markup);
}

function clear() {
    gallery.innerHTML = "";
}

async function loadMore(event) {
event.preventDefault();
const photos = await getPhotos(input.value);
renderPhotos(photos.data.hits);
}