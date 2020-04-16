import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Redirect } from "react-router-dom";

import { userActions } from "../actions";

class LogInForm extends Component {
  constructor(props) {
    super(props);

    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      username: "",
      password: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.setState({ submitted: true });
    if (username && password) {
      this.props.logIn(username, password);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h1 className="title is-3">Log In</h1>
          <p>All fields are case sensitive.</p>

          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              className="input"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

const mapDispatchToProps = (dispatch) => ({
  logIn: (username, password) =>
    dispatch(userActions.login(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInForm);
