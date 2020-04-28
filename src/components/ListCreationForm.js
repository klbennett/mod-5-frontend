import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { listActions } from "../actions";
import { notify } from "react-notify-toast";

class ListCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newListTitle: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ newListTitle: e.target.value });
  }

  handleSubmit = () => {
    if (this.state.newListTitle.length >= 5) {
      this.props.createList(this.state.newListTitle);
      notify.show("Created list!", "success");
      this.setState({
        newListTitle: "",
      });
    }
    notify.show(
      "Sorry, could not create list. Your list title should be at least 5 characters long.",
      "error"
    );
  };

  render() {
    return (
      <>
        <div className="container">
          <h1>
            {" "}
            Create a list to save your search results. You can view your saved
            results in your <Link to="/profile">Profile</Link> at any time!
          </h1>
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter title"
                onChange={this.handleChange}
                value={this.state.newListTitle}
              />
            </div>
            <div className="control">
              <a href className="button is-info" onClick={this.handleSubmit}>
                Create
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createList: (title) => dispatch(listActions.createList(title)),
  getUsersLists: () => dispatch(listActions.getUsersLists()),
});

export default connect(
  null,
  mapDispatchToProps
)(ListCreationForm);
