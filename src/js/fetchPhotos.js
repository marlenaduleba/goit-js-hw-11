import axios from 'axios';
export const pageDefault = 1;
export let page = 1;
export let limit = 40;
export const myKey = `32655880-e7a49c73234a053b338665414`;
export const baseUrl = `https://pixabay.com/api/`;

export async function getPhotos(searchValue) {
  
  const searchParams = new URLSearchParams({
    key: myKey,
    q: searchValue,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: `true`,
    per_page: limit,
    page
  });
  const photos = await axios.get(`${baseUrl}?${searchParams}`).then(page += 1);
  return photos;
}

export function pageReset() {
page = pageDefault;
}