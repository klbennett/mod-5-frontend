import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <nav class="footer is-fixed-bottom">
        <div class="content has-text-centered">
          <p>
            <strong>WhatTheySaid</strong> by{" "}
            <a href="https://www.linkedin.com/in/kay-bennett-a2341362">
              Kay Bennett
            </a>
            . Built with React, Redux, Javascript, Compromise, Rails and Bulma.
          </p>
        </div>
      </nav>
    );
  }
}
