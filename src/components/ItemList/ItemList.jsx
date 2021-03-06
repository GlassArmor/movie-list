import React from 'react';
import './ItemList.css';

import PropTypes from 'prop-types';
import { Alert } from 'antd';

import Item from '../Item';

function ItemList( { movieList, mode } ) {

  if (!movieList) {
    return (
      <div>null</div>
    );
  };

  if ( movieList.length === 0 && mode==='Rated' ) {
    return (
        <div className='item-list-message'>
          <Alert
            message='First rate something to display here :)'
            type='info' />
        </div>
    )
  };

  if ( movieList.length === 0 ) {
    return (
        <div className='item-list-message'>
          <Alert
            message='WHOOPS! Nothing to show you, try another search! Or not.'
            type='warning' />
        </div>
    )
  };

  const movies = movieList.map( (movie) =>
    <Item key={ movie.id }
          id={ movie.id }
          name={ movie.title }
          date={ movie.release_date }
          coverPath={movie.poster_path}
          description={ movie.overview }
          rating={ movie.vote_average }
          genres={ movie.genre_ids }
          myRating={ movie.rating } />
  );

  return (
      <ul className='item-list'>
        { movies }
      </ul>
  )
}

ItemList.propTypes = {
  movieList: PropTypes.arrayOf( PropTypes.object ),
  mode: PropTypes.oneOf(['Search', 'Rated', null])
};

ItemList.defaultProps = {
  movieList: [],
  mode: null
};

export default ItemList;
