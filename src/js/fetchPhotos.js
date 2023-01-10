import axios from 'axios';
export const pageDefault = 1;
export let page = 1;
export let limit = 40;


export async function getPhotos(searchValue) {
  const baseUrl = `https://pixabay.com/api/`;
  const searchParams = new URLSearchParams({
    key: `32655880-e7a49c73234a053b338665414`,
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