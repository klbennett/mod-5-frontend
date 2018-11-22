import React from 'react';
import * as Actions from "./actions";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import SearchBox from './components/SearchBox'
import SearchResultsContainer from './containers/SearchResultsContainer';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <SearchBox/>
        <SearchResultsContainer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



