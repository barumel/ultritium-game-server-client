import React from 'react';
import PropTypes from 'prop-types';
import PacmanLoader from 'react-spinners/PacmanLoader';

import './loader.css';

const Loader = React.memo((props) => {
  return (
    <div className="general-loader">
      <PacmanLoader {...props} />
    </div>
  );
});

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

Loader.defaultProps = {
  size: 18,
  color: 'black'
};

export default Loader;
