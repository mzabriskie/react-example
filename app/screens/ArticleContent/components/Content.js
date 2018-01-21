import React, {Component, PropTypes} from 'react';
import {getContent} from '../../../utils/elastic-api'

export default class Content extends Component {

  constructor() {
    super();
    this.state = {
      content: ''
    }
  }

  getContent() {
      const {id} = this.props;
      this.props.getContent(id).then(content => {
          this.setState({
            content: content
          });
      });
  }

  componentWillMount() {
    this.getContent();
  }

  render() {
    const {content} = this.state
    return (
      <div>
        {content}
      </div>
    );
  }
}

Content.propTypes = {
  id: PropTypes.string.isRequired,
  getContent: PropTypes.func,
};

Content.defaultProps = {getContent};
