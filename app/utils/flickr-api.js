import axios from 'axios';

const key = '88bac37d4aae79eb904dd8b4a864fd36';
const perPage = 40;
const base = `https://api.flickr.com/services/rest/?
    method=flickr.photos.getRecent&
    format=json&api_key=${key}&
    extras=description,owner_name,tags&
    nojsoncallback=1&
    per_page=${perPage}&
`;
export {getData};

function getData(page) {
  return axios({
    url: `${base}page=${page}`,
  });
}

