import React, { Component } from 'react';
import photo from '../images/big-ben.jpg';
import SearchBox from '../components/SearchBox';

export default class HomeContainer extends Component {
  render() {
    return <div>
        <section class="hero is-dark is-fullheight-with-navbar">
          <div class="hero-body">
            <div class="container ">
              <p class="title">Welcome to WhatTheySaid</p>
              <img src={photo} alt="Big Ben" />
            </div>
          </div>
            <SearchBox />
        </section>
      </div>;
  }
}
