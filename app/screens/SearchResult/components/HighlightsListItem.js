import React, {PropTypes} from 'react';

export default HighlightsListItem;

function HighlightsListItem({highlight}) {
  return (
    <li>
      <h6>
        <div className="content" dangerouslySetInnerHTML={{__html: highlight}} />
      </h6>
    </li>
  );
}

HighlightsListItem.propTypes = {
  highlight: PropTypes.string,
};

HighlightsListItem.defaultProps = {
  highlight: {},
};
