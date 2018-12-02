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
        <section className="hero is-dark is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container ">
            <p className="title">Welcome to WhatTheySaid</p>
              <img src={photo} alt="Big Ben" />
            </div>
          </div>
          <SearchContainer />
        </section>
      </div>;
  }
}
