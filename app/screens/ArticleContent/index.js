import React, {Component, PropTypes} from 'react';
import Content from './components/Content'

export default class ArticleContent extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.router.push({pathname: `/file/${this.props.params.id}`});
    // this.context.router.replace({pathname: `http://localhost:8080/api/getFileById?Id=${this.props.params.id}`});
  };

  myfunc = (e) => {
    e.preventDefault();
    window.location.href = `http://localhost:8080/api/getFileById?Id=${this.props.params.id}`;
  }

  render() {
    const {id} = this.props.params;
    return (
      <section className="container home">
        <form
          className="form-inline"
          role="form"
          onSubmit={this.handleSubmit}
        >
          <button onClick={myfunc} className="btn btn-primary">
            Download
          </button>
          <Content id={id} />
        </form>
      </section>
    );
  }
}

ArticleContent.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

ArticleContent.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
