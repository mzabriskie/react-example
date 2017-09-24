import React, {PropTypes} from 'react';

export default ArticlesListItem;

function ArticlesListItem({article}) {
  return (
    <li className="border-bottom">
      <h4>{article._id}</h4>
    </li>
  );
}

ArticlesListItem.propTypes = {
  article: PropTypes.shape({
    name: PropTypes.string,
  }),
};

ArticlesListItem.defaultProps = {
  article: {},
};
