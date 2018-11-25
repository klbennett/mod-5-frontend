import React, { Component } from 'react'
import LogInForm from "../components/LogInForm";



export default class LogInContainer extends Component {
  render() {
    return (
    <div className="container">
    <div className="field is-grouped is-grouped-centered">
        <LogInForm />
      </div>
    </div>
    )
  }
}
