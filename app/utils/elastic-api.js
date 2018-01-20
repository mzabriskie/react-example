import axios from 'axios';

const BASE_URL = 'http://localhost:9200/crystal/_search';
const PROXY_URL_CONTENT = 'http://localhost:8080/api/getContentById';
const PROXY_URL_FILE = 'http://localhost:8080/api/getFileById';

export {getArticles, getContent, getFile};

function getArticles(query, size, from) {
    return axios.post(BASE_URL, {
            "query": {
                "match": { "attachment.content": query }
            },
            "_source": ["_id"],
            "size": size,
            "from": from,
            "highlight": {
                "pre_tags" : ["<mark>"],
                "post_tags" : ["</mark>"],
                "fields": {
                    "attachment.content": {"type": "plain"}
                }
            }
        }).then(response => response.data.hits);
}

function getContent(id) {
  return axios.get(PROXY_URL_CONTENT, {
    params: {
      Id: id
    }
  }).then(response => response.data.content);
}

function getFile(id) {
  return axios.get(PROXY_URL_FILE, {
    params: {
      Id: id
    }
  })
}