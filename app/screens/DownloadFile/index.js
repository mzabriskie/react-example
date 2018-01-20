import React, {Component, PropTypes} from 'react';
import {getFile} from '../../utils/elastic-api'

export default class DownloadFile extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.router.push({pathname: `/file/${this.props.params.id}`});
  };

  constructor() {
    super();
    getFile(this.props.params.id);
  }

  // getFile() {
  //   const {id} = this.props.params;
  //   this.props.getFile(id);
  // }
  //
  // render() {
  //   const {id} = this.props.params;
  //   return (getFile(id))
  // }
}

DownloadFile.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string
  }),
  getFile: PropTypes.func
};

// DownloadFile.defaultProps = {getFile};

DownloadFile.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
