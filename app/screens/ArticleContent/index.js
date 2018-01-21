import React, {Component, PropTypes} from 'react';
import Content from './components/Content'

export default class ArticleContent extends Component {

  render() {
    const {id} = this.props.params;

    function redirect(e) {
      e.preventDefault();
      // window.location.href = `http://localhost:8080/api/getFileById?Id=${this.props.params.id}`;
      window.location.href = `http://localhost:8080/api/getFileById?Id=карбид%20кр%20пластины%20эпи.pdf`;
    }

    return (
      <div className="container">
        <button onClick={redirect} className="btn btn-primary">
          Download
        </button>
        <Content id={id} />
      </div>
    );
  }
}

ArticleContent.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
