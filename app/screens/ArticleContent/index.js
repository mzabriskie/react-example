import React, {Component, PropTypes} from 'react';
import Content from './components/Content'
import {PROXY_URL_FILE} from "../../utils/proxy-api";

export default class ArticleContent extends Component {

  redirect(e) {
    e.preventDefault();
    window.location.href = `${PROXY_URL_FILE}?Id=${this.props.params.id}`;
  }

  render() {
    const {id} = this.props.params;
    return (
      <div className="container">
        <button onClick={this.redirect.bind(this)} className="btn btn-primary">
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
