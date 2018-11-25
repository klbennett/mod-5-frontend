import React, { Component } from 'react';
import { connect } from "react-redux";
import { hansard } from "../actions";

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
          {this.props.results.rows &&
            this.props.results.rows.map(result => <SearchResult result={result} />)}
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  results: state.results,
  loading: state.results.loading,
  error: state.results.error
});

export default connect(mapStateToProps)(SearchResultsContainer);