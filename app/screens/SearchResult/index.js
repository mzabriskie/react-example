import React, {Component, PropTypes} from 'react';
import ArticlesList from './components/ArticlesList'
import PagesBar from "./components/PagesBar";

export default class SearchResult extends Component {

  constructor() {
    super();
    this.state = {currentPage: 0};
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this)
  }

  incrementPage(e){
    e.preventDefault();
    this.setState(function(prevState) {
      return {
        currentPage: prevState.currentPage + 1
      }
    });
  }

  decrementPage(e){
    e.preventDefault();
    this.setState(function(prevState) {
      return {
        currentPage: prevState.currentPage > 0 ? prevState.currentPage - 1 : prevState.currentPage
      }
    });
  }

  render() {
    const {query} = this.props.params;
    const {currentPage} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Articles</h3>
            <ArticlesList query={query} pageNumber={currentPage} />
          </div>
        </div>
        <PagesBar decrementPage={this.decrementPage} incrementPage={this.incrementPage} />
      </div>
    );
  }
}

SearchResult.propTypes = {
  params: PropTypes.shape({
    query: PropTypes.string,
  }),
};
