/* eslint-disable */
import React, { Component } from 'react';
import './App.css';

import { Spin, Alert, Pagination } from 'antd';
import 'antd/dist/antd.css';
import debounce from 'lodash.debounce';

import ItemList from '../ItemList';
import getMovieList from '../../services/ApiClient/ApiClient';
import SearchField from '../SearchField';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: false,
      errorCatched: false,
      currentPage: 1
    };


    this.setError = (message) => {
      this.setState(
        { errorCatched: message } );
    };

    this.searchMovies = (query, pageNumber) => {

      if(!query) return;
      this.setState({ queryNow: query, isLoading: true, currentPage: pageNumber });

      getMovieList(query, pageNumber)
        .then( (res) => {
          this.setState( {
            movieList: res.results,
            isLoading: false,
            results: res.total_results
          });
        })
        .catch((err) => {
          this.setError(err.message);
        });
    };

    this.setPage = (pageNumber) => {
      this.setState({
          currentPage: pageNumber
      });
      const { queryNow } = this.state;
      this.searchMovies(queryNow, pageNumber);
    };

    this.componentDidMount = () => {
      this.searchMovies('return', 1);
    };

  }

  render() {

    const { movieList, isLoading, errorCatched, results, currentPage } = this.state;

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
    if ( errorCatched ) {
      errorBox = ( <div className='error_wrapper'>
                    <Alert message={`Something gone wrong, error
                         text: ${ errorCatched }`} type='error'/>
                     </div> );
      if ( errorCatched === 'Failed to fetch') {
        errorBox = ( <div className='error_wrapper'>
                      <Alert message='Seems like you have lost connection to the Internet,
                                  try rebooting your router or smthn.' type='error'/>
                    </div>);
      };
    };

    return (
        <div className='wrapper'>
          <SearchField searchMovies = { debounce(this.searchMovies, 700) }/>
          { loading }
          { listView }
          { errorBox }
          <div className='pagination_wrapper'>
            <Pagination defaultCurrent={1}
                        current={currentPage}
                        total={results}
                        onChange={this.setPage}
                        showSizeChanger={false}
                        defaultPageSize={20}
                        hideOnSinglePage />
          </div>

        </div>
    );
  }
}
