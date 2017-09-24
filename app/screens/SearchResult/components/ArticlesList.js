import React, {Component, PropTypes} from 'react';
import ArticlesListItem from './ArticlesListItem';
import {getArticles} from '../../../utils/elastic-api'

export default class ArticlesList extends Component {
  constructor() {
    super()
    this.state = {articles: []}
  }

  getArticles() {
      const {query} = this.props
      this.props.getArticles(query).then(articles => {
          this.setState({articles});
      });
  }

  componentWillMount() {
      this.getArticles();
  }

  render() {
    const {articles} = this.state
    return (
      <ul className="list-unstyled">
        {renderArticles(articles)}
      </ul>
    );
  }
}

ArticlesList.propTypes = {
  query: PropTypes.string.isRequired,
  getArticles: PropTypes.func,
};
ArticlesList.defaultProps = {getArticles}

function renderArticles(articles) {
  return articles
    .map(article => <ArticlesListItem key={article._id} article={article} />);
}
