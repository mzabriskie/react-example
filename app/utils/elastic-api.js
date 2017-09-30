import axios from 'axios';

const BASE_URL = 'http://localhost:9200/crystal/_search';

export {getArticles};

/*
* Write this in elastic config:
* http.cors.enabled : true
* http.cors.allow-origin : "*"
* */

function getArticles(query, size, from) {
    return axios.post(BASE_URL, {
            "query": {
                "match": { "attachment.content": query }
            },
            "_source": ["_id"],
            "size": size,
            "from": from,
            "highlight": {
                "fields": {
                    "attachment.content": {"type": "plain"}
                }
            }
        }).then(response => response.data.hits);
}
