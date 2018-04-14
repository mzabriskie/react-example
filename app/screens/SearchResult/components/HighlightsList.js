import React, {Component, PropTypes} from 'react';
import HighlightsListItem from './HighlightsListItem';

export default class HighlightsList extends Component {
  constructor() {
    super();
    this.state = {highlights: []}
  }

  render() {
    const {highlights} = this.props
    return (
      <ul>
        {renderHighlights(highlights)}
      </ul>
    );
  }
}

HighlightsList.propTypes = {
  highlights: PropTypes.array,
};

function renderHighlights(highlights) {
  let it = 0;
  return highlights
    .map(highlight => <HighlightsListItem key={++it} highlight={highlight} />);
}
