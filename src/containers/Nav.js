import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogInContainer from "./LogInContainer";
import SignUpContainer from "./SignUpContainer";
import ProfilePage from "./ProfilePage";
import HomeContainer from "./HomeContainer";
import SearchResultsContainer from "./SearchResultsContainer";
import { connect } from "react-redux";
import { userActions } from "../actions";
import { notify } from "react-notify-toast";
import { history } from "../helpers";

class Nav extends Component {
  redirectAfterLogout = () => {
    notify.show("You are now logged out", "warning");
    this.props.logOutUser();
    return history.push("/");
  };

  render() {
    const { authentication } = this.props;
    return (
      <Router>
        <>
          <div className="tabs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                {authentication.loggedIn ? (
                  <Link to="/profile">Profile</Link>
                ) : (
                  <Link to="/signup">Sign Up</Link>
                )}
              </li>
              <li>
                {authentication.loggedIn ? (
                  <a
                    href
                    onClick={() => {
                      this.redirectAfterLogout();
                    }}
                  >
                    Log Out
                  </a>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>

          <Route path="/results" component={SearchResultsContainer} />
          <Route path="/login" component={LogInContainer} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/signup" component={SignUpContainer} />
          <Route path="/home" component={HomeContainer} />
          <Route exact path="/" component={HomeContainer} />

          {/* <Route path="/profile" component={Profile} /> */}
        </>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    authentication: state.authentication
  };
};

const mapDispatchToProps = dispatch => ({
  logOutUser: searchResult => dispatch(userActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
