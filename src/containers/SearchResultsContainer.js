import React, { Component } from 'react';
import { connect } from "react-redux";
import { hansard } from "../actions";
import { listActions } from "../actions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SearchResult from "../components/SearchResult";
import ListCreationForm from "../components/ListCreationForm";


class SearchResultsContainer extends Component {

  componentDidMount() {
    this.props.usersLists()
  }

  render() {
   
    return(
    <div className="column">
      <div className="container is-fluid">
        <div className="notification">
          {this.props.searchTerm && <h1>
              Your results for <b> "{this.props.searchTerm}" </b>.
            </h1>}
          <ListCreationForm />
          {this.props.results ? this.props.results
              .filter(result => result.body.length > 5)
              .map(result => (
                <SearchResult
                  result={result}
                  userLists={this.props.usersLists}
                  searchTerm={this.props.searchTerm}
                />
              )) : <h1> Sorry, no results were found for that query. </h1>}
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  searchTerm: state.hansard.searchTerm,
  results: state.hansard.results,
  loading: state.hansard.loading,
  error: state.hansard.error,
  userLists: state.userLists
});

const mapDispatchToProps = dispatch => ({
  usersLists: () => dispatch(listActions.getUsersLists())
});



export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);