import axios from 'axios';

const BASE_URL = 'http://localhost:9200/crystal/_search';

export {getArticles};

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
