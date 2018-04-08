import React, {Component, PropTypes} from 'react';
import ArticlesList from './components/ArticlesList'
import PagesBar from "./components/PagesBar";

export default class SearchResult extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.context.router.push({
            pathname: `/search/${this._query.value}`
        });
    };

    constructor() {
        super();
        this.state = {currentPage: 0};
        this.incrementPage = this.incrementPage.bind(this);
        this.decrementPage = this.decrementPage.bind(this)
    }

    incrementPage(e) {
        e.preventDefault();
        this.setState(function (prevState) {
            return {
                currentPage: prevState.currentPage + 1
            }
        });
    }

    decrementPage(e) {
        e.preventDefault();
        this.setState(function (prevState) {
            return {
                currentPage: prevState.currentPage > 0 ? prevState.currentPage - 1 : prevState.currentPage
            }
        });
    }

    render() {
        const {query} = this.props.params;
        const {chemicalElement} = this.props.params;
        const {chemicalFormula} = this.props.params;
        const {crystalSystem} = this.props.params;
        const {radiusType} = this.props.params;
        const {spaceGroup} = this.props.params;
        const {currentPage} = this.state;
        return (
            <section className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    placeholder="Enter a query"
                                    className="form-control"
                                    ref={ref => (this._query = ref)}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    placeholder="Type Chemical Element"
                                    className="form-control"
                                    defaultValue={chemicalElement}
                                    ref={ref => (this._chemicalElement = ref)}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    placeholder="Type Chemical Formula"
                                    className="form-control"
                                    ref={ref => (this._chemicalFormula = ref)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    placeholder="Type Crystal System"
                                    className="form-control"
                                    defaultValue={crystalSystem}
                                    ref={ref => (this._crystalSystem = ref)}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    placeholder="Type Radius Type"
                                    className="form-control"
                                    ref={ref => (this._radiusType = ref)}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    placeholder="Type Space Group"
                                    className="form-control"
                                    ref={ref => (this._spaceGroup = ref)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-1">
                                <button type="submit" className="btn btn-primary">
                                    Go
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ArticlesList
                                query={query}
                                chemicalElement={chemicalElement}
                                chemicalFormula={chemicalFormula}
                                crystalSystem={crystalSystem}
                                radiusType={radiusType}
                                spaceGroup={spaceGroup}
                                pageNumber={currentPage}/>
                        </div>
                    </div>
                    <PagesBar decrementPage={this.decrementPage} incrementPage={this.incrementPage}/>
                </form>
            </section>
        );
    }
}

SearchResult.propTypes = {
    params: PropTypes.shape({
        query: PropTypes.string,
        chemicalElement: PropTypes.string,
        chemicalFormula: PropTypes.string,
        crystalSystem: PropTypes.string,
        radiusType: PropTypes.string,
        spaceGroup: PropTypes.string,
    }),
};

SearchResult.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
