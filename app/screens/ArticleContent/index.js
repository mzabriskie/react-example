import React, {Component, PropTypes} from 'react';
import Content from './components/Content'

export default class ArticleContent extends Component {

  render() {
    const {id} = this.props.params;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Content id={id} />
          </div>
        </div>
      </div>
    );
  }
}

ArticleContent.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
