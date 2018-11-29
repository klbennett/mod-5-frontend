import React, { Component } from 'react';
import photo from '../images/big-ben.jpg';
import SearchContainer from './SearchContainer';
import Notifications, { notify } from 'react-notify-toast';


export default class HomeContainer extends Component {

  componentDidMount() {
    notify.show("Welcome!", "success");
  }

  render() {
    return <div>
        <section class="hero is-dark is-fullheight-with-navbar">
          <div class="hero-body">
            <div class="container ">
              <p class="title">Welcome to WhatTheySaid</p>
              <img src={photo} alt="Big Ben" />
            </div>
          </div>
            <SearchContainer />
        </section>
      </div>;
  }
}
