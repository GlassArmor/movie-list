/* eslint-disable */

import React, { Component } from 'react';
import './ModeSelector.css';

function ModeSelector ({ selected , selectMode }) {

  let searchButton = 'selector_button';
  let ratedButton = 'selector_button';
  if (selected === 'Search') searchButton = `${searchButton} selector_button-selected`;
  if (selected === 'Rated') ratedButton = `${ratedButton} selector_button-selected`;

  return (
    <div className = 'selector_wrapper'>
      <button className={ searchButton }
              onClick={ () => { selectMode('Search') } } >Search</button>
            <button className={ ratedButton }
              onClick={ () => { selectMode('Rated') } } >Rated</button>
    </div>
  );
};

export default ModeSelector;
