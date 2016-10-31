import React, {Component} from 'react';
import {getData} from '../../utils/flickr-api'

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            page:1,
            allowScroll: true,
            showToast: false,
            photos:[]
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        const scrollTop = event.srcElement.body.scrollTop;
        const scrollHeight = event.srcElement.body.scrollHeight;
        const relativePosition = scrollTop / scrollHeight;
        if (relativePosition > 0.7 && this.state.allowScroll) {
            console.log('scrolling...');
            this.setState({
                page:this.state.page + 1,
                allowScroll: false,
                showToast: true
            });
            setTimeout(function() { this.setState({allowScroll: true}); }.bind(this), 1000);
            setTimeout(function() { this.setState({showToast: false}); }.bind(this), 3000);
            this.pushPageinDOM(this.state.page);
        }
    }

    pushPageinDOM(page) {
        getData(page).then(res => {
          this.setState({photos:this.state.photos.concat(res.data.photos.photo)});
        });
    }

  componentWillMount() {
    this.pushPageinDOM(1);
  }

  render() {
      const photosList = this.state.photos.map((photo, index) => (
          <div key={index} className="photo">
              <img className="photo__image"
                   src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
              />
              <div>
                  <a
                      className="photo__title"
                      href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}`} >
                      {photo.title}
                  </a>
                  <span className="photo__text">by</span>
                  <a
                      className="photo__owner"
                      href={`https://www.flickr.com/people/${photo.owner}/`}
                  >
                      {photo.ownername}
                  </a>
              </div>
              <Description content={photo.description._content} />
              <Tags tags={photo.tags} />
          </div>
      ));

      return (
          <div className="wrapper">
              {photosList}
              {this.state.showToast &&
                  <div className="toast" >
                      Loading...
                  </div>
              }
          </div>
      );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const Description = (props) => {
    const hasContent = !!props.content;
    const content = props.content || 'No discription';
    return (
        <div className={`photo__content ${!hasContent && 'photo__content--nothing'}`}>{content}</div>
    );
};

const Tags = (props) => {
    const hasTags = !!props.tags;
    const tags = props.tags ? props.tags.split(' ').map((tag, index) => (
        <div className="photo__tag" key={index}>
            {tag}
        </div>
        )) : 'No tags';
    return (
        <div className={`photo__tags ${!hasTags && 'photo__tags--nothing'}`}>{tags}</div>
    );
};