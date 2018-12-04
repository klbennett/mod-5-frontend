import React, { Component } from 'react';
import photo from '../images/big-ben.jpg';
import SearchContainer from './SearchContainer';
import Notifications, { notify } from 'react-notify-toast';
import NewsHeaderTile from '../components/NewsHeaderTile';


export default class HomeContainer extends Component {

  componentDidMount() {
    notify.show("Welcome!", "success");
  }
  render() {
    return (
      <>
        <section className="hero is-dark is-fullheight-with-navbar">
        <div className="hero-body">
            <div className="container"> 
            <h1 className="title">Welcome to WhatTheySaid</h1>
            <h2 className="subtitle"> A portal for discovering and recording what politicians are saying about the issues that matter to you. </h2>
              <img src={photo} alt="Big Ben" />
          <SearchContainer />
            </div>
          </div> 
        </section>
        <NewsHeaderTile/>
        </>
      )
  }
}
