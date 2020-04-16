import React, { Component } from "react";
import LogInForm from "../components/LogInForm";
import { BrowserRouter as Redirect } from "react-router-dom";
import { history } from "../helpers/history";
import { connect } from "react-redux";

function LogInContainer(props) {
  return props.authentication.user ? (
    <h2 is-large>
      You are now logged in! <a href="/">New search?</a>
    </h2>
  ) : (
    <div className="container">
      <div className="field is-grouped is-grouped-centered">
        <LogInForm />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

export default connect(mapStateToProps)(LogInContainer);
