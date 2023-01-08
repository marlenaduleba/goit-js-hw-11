import axios from 'axios';

export async function getPhotos(searchValue) {
  const baseUrl = `https://pixabay.com/api/`;
  const searchParams = new URLSearchParams({
    key: `32655880-e7a49c73234a053b338665414`,
    q: searchValue,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: `true`,
  });
  const photos = await axios.get(`${baseUrl}?${searchParams}`);
  return photos;
}
