import React, { Component } from 'react';
import { connect } from 'react-redux;

import SearchBox from '../components/SearchBox';


export class SearchContainer extends Component {

    getInfo = () => {
    
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
    }

  render() {
    return (
      <div>
        <SearchBox/> 
      </div>
    )
  }
}
