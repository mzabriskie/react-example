import axios from 'axios';

const BASE_URL = 'http://localhost:9200/crystal/_search';
const PROXY_URL = 'http://localhost:8080/api/getContentById'

export {getArticles, getContent};

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
  return axios.get(PROXY_URL, {
    params: {
      Id: id
    }
  }).then(response => response.data.content);
}