import React, {Component, PropTypes} from 'react';
import {getContent} from '../../../api/proxy-api'

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
      <p>
        {content}
      </p>
    )
  }
}

Content.propTypes = {
  id: PropTypes.string.isRequired,
  getContent: PropTypes.func,
};

Content.defaultProps = {getContent};
