import React from 'react';
import './Item.css';

import format from 'date-fns/format';
import PropTypes from 'prop-types';

const shorten = (text) => {
  if (text.length < 200) return text;
  let index = 200;
  for ( let i = 199; i < text.length; i++) {
    if (text[i] === ' ') {
      index = i;
      break;
    };
  };
  return `${text.slice(0, index)}...`;
}


function Item({name, date, description, coverPath }) {

  const imgPath = `https://image.tmdb.org/t/p/w200${coverPath}`;
  let releaseDate = 'Release date unknown';
  if (date) releaseDate = format( new Date(date), 'MMMM d, yyyy');

  return (
    <li className='item'>
      <img className='item-cover' alt='Movie Cover'
           src={imgPath} />
      <div className='item-info'>
        <h2 className='item-name'>{name}</h2>
        <div className='item-date'>{ releaseDate }</div>
        <div className='item-genres'>
          <div className='item-genre'>Action</div>
          <div className='item-genre'>Drama</div>
        </div>
        <p className='item-description'>
          { shorten(description) }
        </p>
      </div>
    </li>
  );
};

Item.defaultProps = {
  name: 'Some epic movie',
  date: '02-02-2002',
  description: 'Some movie description',
  coverPath: ''
};

Item.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  coverPath: PropTypes.string
};

export default Item;
