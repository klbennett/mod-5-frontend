import React, { Component } from "react";
import { connect } from "react-redux";
import { listActions } from "../actions";
import SearchResult from "../components/SearchResult";
import ListCreationForm from "../components/ListCreationForm";
import nlp from "compromise";

class SearchResultsContainer extends Component {
  componentWillMount() {
    this.props.getUsersLists();
  }

  highlightSearchTerm = text => {
    text.replace("<strong>", "");
    text.replace("</strong>", "");
  };

  cleanText = text => {
    let result = text.replace(
      /((&#[0-9])\w+)|(<\/?("[^"]*"|'[^']*'|[^>])*(>|$))/g,
      ""
    );
    return result;
  };

  nlpKeywords = text => {
    let input = this.cleanText(text);
    let doc = nlp(input)
      .topics()
      .out("array");
    const unique = doc.filter((v, i, a) => a.indexOf(v) === i);
    return unique.map(keyword => <span class="tag">{keyword}</span>);
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
                  highlightSearchTerm={this.highlightSearchTerm}
                  cleanText={this.cleanText}
                  nlpKeywords={this.nlpKeywords}
                  // loggedIn={this.state.authentication.user}
                />
              ))}
          {!this.props.results && (
            <h1 className="title is-4">
              Sorry, no results were found for that query.{" "}
              <a href="/">New search?</a>
            </h1>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsContainer);
