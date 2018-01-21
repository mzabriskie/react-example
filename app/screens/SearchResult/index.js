import React, {Component, PropTypes} from 'react';
import ArticlesList from './components/ArticlesList'
import PagesBar from "./components/PagesBar";

export default class SearchResult extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.context.router.push({pathname: `/search/${this._input.value}`});
  };

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
      <section className="container">
        <form
          className="form-inline"
          role="form"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter a query"
                      className="form-control"
                      ref={ref => (this._input = ref)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Go
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <ArticlesList query={query} pageNumber={currentPage} />
                </div>
              </div>
              <PagesBar decrementPage={this.decrementPage} incrementPage={this.incrementPage} />
            </div>
          </div>
        </form>
      </section>
    );
  }
}

SearchResult.propTypes = {
  params: PropTypes.shape({
    query: PropTypes.string,
  }),
};

SearchResult.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
