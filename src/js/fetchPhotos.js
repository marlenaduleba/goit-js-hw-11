import axios from 'axios';



export function getPhotos(name) {

const baseUrl = `https://pixabay.com/api/`;
const params = `?key=32655880-e7a49c73234a053b338665414&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`;

    return axios.get(baseUrl + params);
}