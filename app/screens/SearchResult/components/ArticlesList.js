import React, {Component, PropTypes} from 'react';
import ArticlesListItem from './ArticlesListItem';
import {getArticles} from '../../../api/proxy-api'

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
        const {chemicalElement} = props;
        const {chemicalFormula} = props;
        const {crystalSystem} = props;
        const {radiusType} = props;
        const {spaceGroup} = props;
        const {pageNumber} = props;
        this.props.getArticles(
            query,
            chemicalElement,
            chemicalFormula,
            crystalSystem,
            radiusType,
            spaceGroup,
            pageNumber * 4, 4)
            .then(articles => {
                this.setState({
                    articles: articles.rows,
                    hits: articles.totalHits
                });
            });
    }

    componentWillMount() {
        this.getArticles(this.props);
    }

    componentWillReceiveProps(nextProps) {
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
    query: PropTypes.string,
    chemicalElement: PropTypes.string,
    chemicalFormula: PropTypes.string,
    crystalSystem: PropTypes.string,
    radiusType: PropTypes.string,
    spaceGroup: PropTypes.string,
    pageNumber: PropTypes.number.isRequired,
    getArticles: PropTypes.func,
};

ArticlesList.defaultProps = {getArticles};

function renderArticles(articles) {
    return articles
        .map(article => <ArticlesListItem key={article._id} article={article}/>);
}
