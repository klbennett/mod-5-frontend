import React, { Component } from "react";
import { connect } from "react-redux";
import { hansardActions } from "../actions";
import { notify } from "react-notify-toast";

class SearchBox extends Component {
  // Concerned with taking user input and using it as a keyword to search the api

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      type: "commons"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    const { searchTerm } = this.state;
    this.props.storeSearchResults(searchTerm);
    notify.show("Loading results...", "warning");
  };

  onChange = event => {
    this.setState({
      type: event.target.value
    });
  };

  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-narrow has-text-centered">
          <div className="select is-medium">
            <select value={this.state.type} onChange={this.onChange}>
              <option value="commons">House of Commons</option>
              <option value="westminsterhall">Westminster Hall</option>
              <option value="lords">House of Lords</option>
              <option value="scotland">Scotland</option>
              <option value="northernireland">Northern Ireland</option>
            </select>
          </div>
        </div>
        <div className="column is-narrow has-text-centered is-half">
          <div className="field has-addons">
            <input
              className="input is-medium"
              type="text"
              placeholder="Search"
              onChange={e => this.setState({ searchTerm: e.target.value })}
            />

            <button
              className="button is-medium"
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            >
              <i class="fas fa-search" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  storeSearchResults: (searchTerm, type) =>
    dispatch(hansardActions.fetchHansard(searchTerm, type))
});

export default connect(null, mapDispatchToProps)(SearchBox);
