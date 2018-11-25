import React, { Component } from 'react'
import SignUpForm from "../components/SignUpForm";



export default class SignUpContainer extends Component {
    render() {
        return (
            <div className="container">
                <div className="field is-grouped is-grouped-centered">
                    <SignUpForm />
                </div>
            </div>
        )
    }
}
