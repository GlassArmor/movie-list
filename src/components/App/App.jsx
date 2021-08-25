import React, { Component } from 'react';
import './App.css';

import { Spin, Alert } from 'antd';
import 'antd/dist/antd.css';

import ItemList from '../ItemList';
import getMovieList from '../../services/ApiClient/ApiClient';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: true,
      errorCatched: false
    };


    this.setError = () => {
      this.setState( { errorCatched: true } );
    };

  }

  render() {

    getMovieList('Return')
      .then( (res) => {
        this.setState( {
          movieList: res.results,
          isLoading: false
        });
      })
      .catch(() => {
        this.setError();
      });

    const { movieList, isLoading, errorCatched } = this.state;

    let loading = null;
    if (isLoading && !errorCatched) {
      loading = (
        <div className='loading'>
          <Spin size='large' />
        </div>);
    }
    let listView = null;
    if (!isLoading && !errorCatched ) listView = <ItemList movieList={movieList} />;

    let errorBox = null;
    if ( errorCatched ) errorBox = <Alert message='Something is wrong...' type='error'/>;

    return (
        <div className='wrapper'>
          { loading }
          { listView }
          { errorBox }
        </div>
    );
  }
}
