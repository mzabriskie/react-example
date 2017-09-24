import React, {Component, PropTypes} from 'react';
import ArticlesList from './components/ArticlesList'

export default class SearchResult extends Component {

  render() {
    const {query} = this.props.params
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Articles</h3>
            <ArticlesList query={query} />
          </div>
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  params: PropTypes.shape({
    query: PropTypes.string,
  }),
}
