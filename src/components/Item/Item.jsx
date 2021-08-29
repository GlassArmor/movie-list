import React from 'react';
import './Item.css';

import format from 'date-fns/format';
import PropTypes from 'prop-types';
import nullCover from './null_cover.jpeg';

const shorten = (text, length) => {
  if (text.length < length) return text;
  let index = length;
  for ( let i = length-1; i < text.length; i++) {
    if (text[i] === ' ') {
      index = i;
      break;
    };
  };
  return `${text.slice(0, index)}...`;
}


function Item({name, date, description, coverPath }) {

  let imgPath = `https://image.tmdb.org/t/p/w200${coverPath}`;
  if ( !coverPath ) imgPath = nullCover;
  let releaseDate = 'Release date unknown';
  if (date) releaseDate = format( new Date(date), 'MMMM d, yyyy');

  return (
    <li className='item'>
      <img className='item-cover' alt='Movie Cover'
           src={imgPath} />
      <div className='item-info'>
        <h2 className='item-name'>{ shorten(name, 100) }</h2>
        <div className='item-date'>{ releaseDate }</div>
        <div className='item-genres'>
          <div className='item-genre'>Action</div>
          <div className='item-genre'>Drama</div>
        </div>
        <p className='item-description'>
          { shorten(description, 200-name.length) }
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
