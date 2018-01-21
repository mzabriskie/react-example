import React, {Component, PropTypes} from 'react';
import ArticlesListItem from './ArticlesListItem';
import {getArticles} from '../../../utils/proxy-api'

export default class ArticlesList extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      hits: 0,
    }
  }

  getArticles(props) {
      const {query} = props;
      const {pageNumber} = props;
      this.props.getArticles(query, null, null, null, null, null, pageNumber * 4, 4).then(articles => {
          this.setState({
            articles: articles.rows,
            hits: articles.totalHits
          });
      });
  }

  componentWillMount() {
    this.getArticles(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.getArticles(nextProps);
  }

  render() {
    const {articles} = this.state;
    const {hits} = this.state;
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

ArticlesList.defaultProps = {getArticles};

function renderArticles(articles) {
  return articles
    .map(article => <ArticlesListItem key={article._id} article={article} />);
}
