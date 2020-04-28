import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../actions";

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const userObj = this.state;
    const { dispatch } = this.props;
    this.setState({ submitted: true });
    if (username && password) {
      dispatch(userActions.register(userObj));
    }
  }

  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              className="input"
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              Create account
            </button>
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

export default connect(mapStateToProps)(SignUpForm);
