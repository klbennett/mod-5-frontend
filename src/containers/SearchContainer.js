import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import SearchBox from '../components/SearchBox';
import SearchResultsContainer from './SearchResultsContainer';


export class SearchContainer extends Component {


    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
    }


  render() {
    return (
      <div>
        <SearchBox/> 
        { this.props.hansard.results  && <Redirect push
          to='/results'/> }
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('hi from mstp')
  return state;
}

export default connect(mapStateToProps)(SearchContainer);