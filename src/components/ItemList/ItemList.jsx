import React from 'react';
import './ItemList.css';

import PropTypes from 'prop-types';

import Item from '../Item';

function ItemList( { movieList } ) {

  if (!movieList) {
    return (
      <div>NULL</div>
    );
  }

  const movies = movieList.map( (movie) =>
    <Item key={ movie.id }
          name={ movie.title }
          date={ movie.release_date }
          coverPath={movie.poster_path}
          description={ movie.overview } />
  );

  return (
      <ul className='item-list'>
        { movies }
      </ul>
  )
}

ItemList.propTypes = {
  movieList: PropTypes.arrayOf( PropTypes.object )
};

ItemList.defaultProps = {
  movieList: [
  {
    id: 0,
    title: 'Some title',
    release_date: '01-01-2001',
    poster_path: 'path',
    overview: 'Example movie description'
  },
  {
    id: 1,
    title: 'Some title',
    release_date: '01-01-2001',
    poster_path: 'path',
    overview: 'Example movie description'
  }]
};

export default ItemList;
