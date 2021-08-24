import React, { Component } from 'react';
import './App.css';

import ItemList from '../ItemList';
import getMovieList from '../../services/ApiClient/ApiClient';

export default class App extends Component {

  constructor() {
    super();

    this.state = {};

  }

  render() {

    getMovieList('return').then( (res) => {
      this.setState( {
        movieList: res.results
      });
    });

    const { movieList } = this.state;

    return (
        <div className='wrapper'>
          <ItemList movieList={movieList} />
        </div>
    );
  }
}
