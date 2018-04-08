import React, {Component} from 'react';

export default class Home extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.context.router.push({
            pathname: `/search/${this._query.value}`
        });
    };

    render() {
        return (
            <section className="container home">
                <form
                    className="form-inline"
                    role="form"
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
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
                    </div>
                </form>
            </section>
        );
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
