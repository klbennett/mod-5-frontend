import React, { Component } from 'react';
import { connect } from "react-redux";
import { hansard } from "../actions";

import SearchResult from "../components/SearchResult";
import ListCreationForm from "../components/ListCreationForm";


class SearchResultsContainer extends Component {

  render() {
   
    return <div className="container is-fluid">
        <div className="notification">
          {this.props.searchTerm && <h1>
              Your results for <b> "{this.props.searchTerm}" </b>
            </h1>}
          <ListCreationForm/>
          {this.props.results ? this.props.results
              .filter(result => result.body.length > 5)
              .map(result => (
                <SearchResult result={result} />
              )) : <h1> Sorry, no results were found for that query. </h1>}
        </div>
      </div>;
  }
}

const mapStateToProps = state => ({
  searchTerm: state.hansard.searchTerm,
  results: state.hansard.results,
  loading: state.hansard.loading,
  error: state.hansard.error,
});

export default connect(mapStateToProps)(SearchResultsContainer);