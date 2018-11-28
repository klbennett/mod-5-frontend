import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogInContainer from './LogInContainer';
import SignUpContainer from "./SignUpContainer";
import SearchBox from '../components/SearchBox';
import ProfilePage from "./ProfilePage";
import HomeContainer from './HomeContainer';
import SearchResultsContainer from './SearchResultsContainer';
import { connect } from "react-redux";
import { userActions } from "../actions";

class Nav extends Component {


  render() {
    return <Router>
        <div className="container">
          <div className="tabs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            <li>
              { this.props.authentication.loggedIn ? <a href onClick={() => {this.props.logOutUser()}}>Log Out</a> : <Link to="/login">Login</Link> }
             </li>
            <li>
              { this.props.authentication.loggedIn ? <Link to="/profile">Profile</Link> : <Link to="/signup">Sign Up</Link> }
            </li> 
            </ul>
          </div>
          <hr />
         
  <Route path="/results" component={SearchResultsContainer} />
  <Route path="/login" component={LogInContainer} />
  <Route path="/profile" component={ProfilePage} />
  <Route path="/signup" component={SignUpContainer} />  
  <Route exact path="/" component={HomeContainer} />

          {/* <Route path="/profile" component={Profile} /> */}
        </div>
      </Router>;
  }

}
const mapStateToProps = state => {
  return {
    authentication: state.authentication
  };
};

const mapDispatchToProps = dispatch => ({
  logOutUser: (searchResult) => dispatch(userActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
