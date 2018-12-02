import React, { Component } from 'react';
import { connect } from "react-redux";
import { hansard } from "../actions";
import { listActions } from "../actions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SearchResult from "../components/SearchResult";
import ListCreationForm from "../components/ListCreationForm";


class SearchResultsContainer extends Component {


  componentWillMount() {
    this.props.getUsersLists()
  }

  cleanText = (text) => {
    //why does only one regex work, how can i combine.
    // ((&#[0-9])\w+)|(<\/?("[^"]*"|'[^']*'|[^>])*(>|$))
    // let result = text.replace(/((&#[0-9])\w+)|(<\/?("[^"]*"|'[^']*'|[^>])*(>|$))/, "");
    let result = text.replace(/((&#[0 - 9]) \w+)| (<\/?("[^"]*"|'[^']*'|[^>])*(>|$))/, "");
    return result;
  };

  render() {
   
    return(
    <div className="column">
      <div className="container is-fluid">
        <div className="notification">
          { this.props.searchTerm && <h1>Your results for <b> "{this.props.searchTerm}" </b></h1> }
          <ListCreationForm userLists={this.props.userlist} />
          { this.props.results && this.props.results
              .filter(result => result.body.length > 5)
              .map(result => (
                <SearchResult
                  result={result}
                  userlist={this.props.userlist}
                  searchTerm={this.props.searchTerm}
                />
              )) }
            { !this.props.results && <h1> Sorry, no results were found for that query. </h1> }
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
  userlist: state.userlist
});

const mapDispatchToProps = dispatch => ({
  getUsersLists: () => dispatch(listActions.getUsersLists())
});



export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);