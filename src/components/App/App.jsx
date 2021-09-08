/* eslint-disable */
import React, { Component } from 'react';
import './App.css';

import { Spin, Alert, Pagination } from 'antd';
import 'antd/dist/antd.css';
import debounce from 'lodash.debounce';

import ItemList from '../ItemList';
import ApiClient from '../../services/ApiClient/ApiClient';
import { AppProvider } from '../../services/AppContext/AppContext';
import SearchField from '../SearchField';
import ModeSelector from '../ModeSelector';

export default class App extends Component {

  constructor() {
    super();

    this.client = new ApiClient;

    this.ratedFilms = {};

    this.state = {
      selected: null,
      sessionID: null,
      isLoading: false,
      errorCatched: false,
      currentPage: 1
    };


    this.setError = (message) => {
      this.setState(
        { errorCatched: message } );
    };

    this.searchMovies = (query, pageNumber) => {
      const { selected, sessionID } = this.state;
      if ( selected === 'Rated' ) {
        this.setState({ isLoading: true, currentPage: 1 });
        this.client.getRatedMovies( sessionID )
                   .then((res) => {
                     this.setState( {
                       movieList: res.results,
                       isLoading: false,
                       results: res.total_results
                     });})
                   .catch((err) => {
                     this.setError(err.message);
                   });
      } else {

      if(!query) return;
      this.setState({ queryNow: query, isLoading: true, currentPage: pageNumber });

      this.client.getMovies(query, pageNumber)
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
    }};

    this.setPage = (pageNumber) => {
      this.setState({
          currentPage: pageNumber
      });
      const { queryNow } = this.state;
      this.searchMovies(queryNow, pageNumber);
    };

    this.selectMode = (mode) => {
      this.setState({ selected: mode });
    };

    this.rateMovie = (id, value) => {
      const { sessionID } = this.state;
      this.client.setRating(id, sessionID, value)
                 .then(()=>{
                              this.ratedFilms.[id] = value;
                            })
                 .catch((err) => { console.log(err) });
    };

    this.componentDidMount = () => {
      this.client.initGuestSession().then( (id) => {
        this.setState({ sessionID: id, selected: 'Search' });
        this.client.getGenres().then( (res) => {
          const pattern = res.reduce( (acc, obj) => {
            return ({ ...acc, [obj.id]: obj.name })
          }, {});
          this.setState({ genreList: pattern });
        }).then( ()=> {
          this.searchMovies('Star Wars', 1);
        });
      });
    };

    this.componentDidUpdate = ( prevProps, prevState ) => {
      const { queryNow, selected } = this.state;
      if ( selected != prevState.selected ) this.searchMovies(queryNow, 1);
    };

  }

  render() {

    const { movieList, isLoading, errorCatched, results, currentPage, selected, genreList } = this.state;
    const loadingBox = (
      <div className='loading'>
        <Spin size='large' />
      </div>);
    if ( !selected ) return ( <div className='wrapper'>{loadingBox}</div>);
    let loading = null;
    if (isLoading && !errorCatched) {
      loading = loadingBox;
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

    let searchField = null;
    if ( selected === 'Search') {
      searchField = (<SearchField searchMovies = { debounce(this.searchMovies, 700) }/>);
    };

    return (
      <AppProvider value={ { genreList: genreList,
                             rateMovie: this.rateMovie,
                             ratedFilms: this.ratedFilms } }>
        <div className='wrapper'>
          <ModeSelector selected={ selected } selectMode={ this.selectMode } />
          { searchField }
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
      </AppProvider>
    );
  }
}
