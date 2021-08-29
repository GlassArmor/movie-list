import React, {Component} from 'react';
import './SearchField.css';

import PropTypes from 'prop-types';

export default class SearchField extends Component {

  static defaultProps = {
    searchMovies: ()=>{}
  }

  static propTypes = {
    searchMovies: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      queryString: ''
    }

    this.onChange = (event) => {
      const { searchMovies } = this.props;
      this.setState({ queryString: event.target.value });
      searchMovies(event.target.value, 1);
    }

  }

  render() {

    const { queryString } = this.state;
    return (<div className='search_wrapper'>
              <input className='search_field'
                   type='text'
                   placeholder='Type to search...'
                   value={ queryString }
                   onChange={ this.onChange }/>
             </div>);
  }
}
