import React, { Component } from 'react';
import { connect } from "react-redux";
import { hansard } from "../actions";
import { listActions } from "../actions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import nlp from "compromise"

import SearchResult from "../components/SearchResult";
import ListCreationForm from "../components/ListCreationForm";


class SearchResultsContainer extends Component {
  componentWillMount() {
    this.props.getUsersLists();
  }

  highlightSearchTerm = text => {
    text.replace('<span class="hi">', "");
    text.replace("</span", "");
  };

  cleanText = text => {
    //why does only one regex work, how can i combine.
    // ((&#[0-9])\w+)|(<\/?("[^"]*"|'[^']*'|[^>])*(>|$))
    // let result = text.replace(/((&#[0-9])\w+)|(<\/?("[^"]*"|'[^']*'|[^>])*(>|$))/, "");
    let result = text.replace(
      /((&#[0 - 9]) \w+)| (<\/?("[^"]*"|'[^']*'|[^>])*(>|$))/,
      ""
    );
    return result;
  };

  displayType = () => {
    switch (this.props.type) {
      case "commons":
        return "House of Commons";
      case "northernireland":
        return "Northern Ireland Assembly";
      case "scotland":
        return "Scottish Parliament";
      case "westminsterhall":
        return "Westminster Hall";
      default:
        return "";
    }
  };

  // nlpTest = () => {
  //   // let nlp = window.nlp_compromise
  //   let input = this.cleanText(result.parent.body);
  //   let processText = nlp(input).topics().data();
  //   processText.out('array');
  // };

  render() {
    return (
      <>
      <div className="container">
        {this.props.searchTerm && (
          <h1>
            Your results for <b> "{this.props.searchTerm}"</b> in{" "}
            <b>{this.displayType()}</b> debates
          </h1>
        )}
        <div className="container">
          {this.props.authentication.user ? (
            <ListCreationForm userLists={this.props.userlist} />
          ) : (
            <h1>Log in to save your search results</h1>
          )}
        </div>
        {this.props.results &&
          this.props.results
            .filter(result => result.body.length > 5)
            .map(result => (
              <SearchResult
                result={result}
                userlist={this.props.userlist}
                searchTerm={this.props.searchTerm}
              />
            ))}
        {!this.props.results && (
          <h1> Sorry, no results were found for that query. </h1>
        )}
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  searchTerm: state.hansard.searchTerm,
  type: state.hansard.type,
  results: state.hansard.results,
  loading: state.hansard.loading,
  error: state.hansard.error,
  userlist: state.userlist,
  authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
  getUsersLists: () => dispatch(listActions.getUsersLists())
});



export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);