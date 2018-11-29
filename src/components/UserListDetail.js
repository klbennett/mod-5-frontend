import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM, { render } from "react-dom";

export default class UserListDetail extends Component {

    render() {
        return <>
        <div class="container">
            {this.props.list.title && <h1 className="title is-4">{ this.props.list.title }</h1>}
            {this.props.list.user_details ? this.props.list.user_details.list_items.map(
                li => (
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">
                        {li.speaker} ({li.speakerParty} - 
                        {li.speakerCons ? li.speakerCons : " House of Lords"})
                      </p>
                    </header>
                    <div className="card-content">
                      <h2 className="subtitle"> {li.debate} </h2>
                      <div className="content">
                        {li.extract ? li.extract : li.body}
                        <br />
                        <time datetime="2016-1-1"> {li.date} </time>
                      </div>
                    </div>
                    <footer className="card-footer">
                      <a href="#" className="card-footer-item">
                        Save
                      </a>
                      <a href="#" className="card-footer-item">
                        Edit
                      </a>
                      <a href="#" className="card-footer-item">
                        Delete from list
                      </a>
                    </footer>
                  </div>
                )
              ) : null}
        </div>
        </>
    }
}

