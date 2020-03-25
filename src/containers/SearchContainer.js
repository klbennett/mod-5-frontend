import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchBox from "../components/SearchBox";

export class SearchContainer extends Component {
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };

  render() {
    const { hansard } = this.props;
    return (
      <>
        <SearchBox />
        {hansard.results && <Redirect push to="/results" />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(SearchContainer);
