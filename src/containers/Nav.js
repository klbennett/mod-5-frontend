import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogInContainer from './LogInContainer';
import SignUpContainer from "./SignUpContainer";
import SearchBox from '../components/SearchBox';
import ProfilePage from "./ProfilePage";
import HomeContainer from './HomeContainer';

export default class Nav extends Component {


  render() {
    return <Router>
        <div className="container">
          <div className="tabs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
          <hr />
          {/* <Route exact path="/" component={Home} /> */}

          <Route path="/login" component={LogInContainer} />
           <Route path="/signup" component={SignUpContainer} />  
          <Route path="/profile" component={ProfilePage} />
          <Route exact path="/" component={HomeContainer} />

          {/* <Route path="/profile" component={Profile} /> */}
        </div>
      </Router>;
  }

}
