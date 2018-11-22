import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchHansard } from "../actions";

import SearchResult from "../components/SearchResult";


class SearchResultsContainer extends Component {

// Concerned with rendering the search results onto the page

  // componentDidMount() {
  //   this.props.dispatch(fetchHansard());
  // }

  render() {
    return (
      <div className="container is-fluid">
        <div className="notification">
          {this.props.searchResults.rows &&
            this.props.searchResults.rows.map(result => <SearchResult result={result} />)}
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchResults: state.hansard
});

export default connect(mapStateToProps)(SearchResultsContainer);