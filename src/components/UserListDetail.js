import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM, { render } from "react-dom";

export default class UserListDetail extends Component {

    render() {
        return <>
            {this.props.list.title && <h1>{ this.props.list.title }</h1>}
            {this.props.list.user_details ? this.props.list.user_details.list_items.map(
                li => (
                  <div class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        {li.speaker} ({li.speakerParty},{" "}
                        {li.speakerCons && li.speakerCons})
                      </p>
                    </header>
                    <div class="card-content">
                      <h2 class="subtitle"> {li.debate} </h2>
                      <div class="content">
                        {li.extract ? li.extract : li.body}
                        <br />
                        <time datetime="2016-1-1"> {li.date} </time>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <a href="#" class="card-footer-item">
                        Save
                      </a>
                      <a href="#" class="card-footer-item">
                        Edit
                      </a>
                      <a href="#" class="card-footer-item">
                        Delete from list
                      </a>
                    </footer>
                  </div>
                )
              ) : <p> List has no list items</p>}
          </>;
    }
}

