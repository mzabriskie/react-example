import React, {Component, PropTypes} from 'react';
import ArticlesList from './components/ArticlesList'
import PagesBar from "./components/PagesBar";

export default class SearchResult extends Component {

  constructor() {
    super()
    this.state = {currentPage: 0}
    this.incrementPage = this.incrementPage.bind(this)
    this.decrementPage = this.decrementPage.bind(this)
  }

  incrementPage(e){
    e.preventDefault()
    this.setState({
      currentPage: ++this.state.currentPage
    })
    this.forceUpdate()
  }

  decrementPage(e){
    e.preventDefault()
    if (this.state.currentPage > 0) {
      this.setState({
        currentPage: --this.state.currentPage
      })
      this.forceUpdate()
    }
  }

  render() {
    const {query} = this.props.params
    const {currentPage} = this.state
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
}
