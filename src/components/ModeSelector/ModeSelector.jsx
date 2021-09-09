import React from 'react';
import './ModeSelector.css';

import PropTypes from 'prop-types';

function ModeSelector ({ selected , selectMode }) {

  let searchButton = 'selector_button';
  let ratedButton = 'selector_button';
  if (selected === 'Search') searchButton = `${searchButton} selector_button-selected`;
  if (selected === 'Rated') ratedButton = `${ratedButton} selector_button-selected`;

  return (
    <div className = 'selector_wrapper'>
      <button className={ searchButton } type='button'
              onClick={ () => { selectMode('Search') } } >Search</button>
            <button className={ ratedButton } type='button'
              onClick={ () => { selectMode('Rated') } } >Rated</button>
    </div>
  );
};

ModeSelector.defaultProps = {
  selected: null,
  selectMode: ()=>{}
};

ModeSelector.propTypes = {
  selected: PropTypes.oneOf(['Search', 'Rated', null]),
  selectMode: PropTypes.func
};

export default ModeSelector;
