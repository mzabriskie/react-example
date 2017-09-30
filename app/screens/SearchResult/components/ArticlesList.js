import React, {Component, PropTypes} from 'react';
import ArticlesListItem from './ArticlesListItem';
import {getArticles} from '../../../utils/elastic-api'

export default class ArticlesList extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      hits: 0,
    }
  }

  getArticles() {
      const {query} = this.props
      const {pageNumber} = this.props
      this.props.getArticles(query, 4, pageNumber * 4).then(articles => {
          this.setState({
            articles: articles.hits,
            hits: articles.total
          });
      });
  }

  componentWillMount() {
    this.getArticles();
  }

  componentWillUpdate(){
    this.getArticles();
  }

  render() {
    const {articles} = this.state
    const {hits} = this.state
    return (
      <div>
        <h4>Hits: {hits}</h4>
        <ul className="list-unstyled">
          {renderArticles(articles)}
        </ul>
      </div>
    );
  }
}

ArticlesList.propTypes = {
  query: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  getArticles: PropTypes.func,
};
ArticlesList.defaultProps = {getArticles}

function renderArticles(articles) {
  return articles
    .map(article => <ArticlesListItem key={article._id} article={article} />);
}
