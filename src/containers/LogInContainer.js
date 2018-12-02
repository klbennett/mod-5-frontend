import React, { Component } from 'react'
import LogInForm from "../components/LogInForm";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";



class LogInContainer extends Component {

  render() {
    return (
    <div className="container">
    <div className="field is-grouped is-grouped-centered">
        <LogInForm />
          {this.props.authentication.loggedIn === true  && <Redirect push
            to='/' />}
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication
  }
}

export default connect(mapStateToProps)(LogInContainer)
