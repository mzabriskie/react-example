import axios from 'axios';

const PROXY_URL_SEARCH = 'http://pmoproject.ru:8080/api/search';
const PROXY_URL_CONTENT = 'http://pmoproject.ru:8080/api/getContentById';
export const PROXY_URL_FILE = 'http://pmoproject.ru:8080/api/getFileById';

export {getArticles, getContent};

function getArticles(query, chemicalElement, chemicalFormula, crystalSystem, radiusType, spaceGroup, from, size) {
    return axios.get(PROXY_URL_SEARCH, {
      params: {
        Query: query,
        ChemicalElement: chemicalElement,
        ChemicalFormula: chemicalFormula,
        CrystalSystem: crystalSystem,
        RadiusType: radiusType,
        SpaceGroup: spaceGroup,
        from: from,
        size: size
      }
    }).then(response => response.data);
}

function getContent(id) {
  return axios.get(PROXY_URL_CONTENT, {
    params: {
      Id: id
    }
  }).then(response => response.data.content);
}
