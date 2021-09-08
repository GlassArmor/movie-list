/* eslint-disable */

import React from 'react';
import './Item.css';
import { AppConsumer } from '../../services/AppContext/AppContext';

import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
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
};

function Item({ id, name, date, description, coverPath, rating, genres, myRating }) {

  let imgPath = nullCover;
  if ( coverPath ) imgPath = `https://image.tmdb.org/t/p/w200${coverPath}`;
  let releaseDate = 'Release date unknown';
  if (date) releaseDate = format( new Date(date), 'MMMM d, yyyy');
  let color = '#E90000';
  if ( rating > 3 ) color = '#E97E00';
  if ( rating > 5 ) color = '#E9D100';
  if ( rating > 7 ) color = '#66E900';

  const ratingStyle = {
    border: `2px solid ${color}`
  }

  return (

    <AppConsumer>
      { ({ genreList, rateMovie, ratedFilms }) => {
        const displayGenres = genres.map((id) => {
           return (<div className='item-genre' key={id}>{ genreList[id] }</div>);
        });
        let initRating = 0;
        if ( myRating ) initRating = myRating;
        if ( ratedFilms.[id] ) initRating = ratedFilms.[id];

          return (
            <li className='item'>
              <img className='item-cover' alt='Movie Cover'
                   src={imgPath} />
              <div className='item-info'>
                <div className='item-header'>
                  <h2 className='item-name'>{ shorten(name, 40) }</h2>
                  <div className='item-rating' style={ ratingStyle }>{ rating }</div>
                </div>
                <div className='item-date'>{ releaseDate }</div>
                <div className='item-genres'>
                  { displayGenres }
                </div>
                <p className='item-description'>
                  { shorten(description, 140-name.length) }
                </p>
                <Rate  className='item-rate-stars' allowHalf defaultValue={ initRating }
                   count={10} onChange={ (value) => rateMovie(id, value) }/>
              </div>
            </li>
          )
        }
      }
    </AppConsumer>
  );
};

Item.defaultProps = {
  name: 'Some epic movie',
  date: '02-02-2002',
  description: 'Some movie description',
  coverPath: '',
  rating: 0.0
};

Item.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  coverPath: PropTypes.string,
  rating: PropTypes.number
};

export default Item;
