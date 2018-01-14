# Elastic_Front

Front-end application for Elasticsearch.<br/>
It's aim to search articles in index "crystal".<br/>
Uses [React] with [webpack], and [babeljs], as well as project structure.


Requirements:
- git
- Node v6
- npm v3

Write this in Elasticsearch config file:
```
http.cors.enabled : true
http.cors.allow-origin : "*"
```

To run the app locally:

```bash
git clone https://github.com/JacksonGibsonESP/Elastic_Front.git
cd Elastic_Front
npm run setup
npm run dev
open http://localhost:8080
```

[React]: http://facebook.github.io/react/
[webpack]: http://webpack.github.io/
[babeljs]: https://babeljs.io/
