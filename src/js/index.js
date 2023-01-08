import Notiflix from 'notiflix';
import { getPhotos } from './fetchPhotos';

const form = document.querySelector("#search-form");
const input = document.querySelector(".search-form__input");
const button = document.querySelector(".search-form__btn");
const gallery = document.querySelector(".gallery");


// form.addEventListener(`submit`, (event) => {
//     event.preventDefault();
//     console.log(input.value);
//     getPhotos(input.value)
//     .then((res) => {
//         console.log(res);
//         console.log(res.data.hits);
//         renderPhotos(res.data.hits);

//     })
//     .catch((error) => console.log(error));
// });

form.addEventListener(`submit`, makeGallery);

async function makeGallery(event) {
    const searchText = input.value;
    event.preventDefault();
    try { const photos = await getPhotos(searchText);
    renderPhotos(photos.data.hits);
        
    } catch (error) {
        console.log(error);
    }
   
}

function renderPhotos(photos) {
    const markup = photos
    .map((photo) => {
        return `<div class="photo-card">
        <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
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







