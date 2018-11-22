import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchHansard } from "../actions";


class SearchResultsContainer extends Component {

// Concerned with rendering the search results onto the page

  // componentDidMount() {
  //   this.props.dispatch(fetchHansard());
  // }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchResults: state.hansard
});

export default connect(mapStateToProps)(SearchResultsContainer);