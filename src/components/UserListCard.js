import React, { Component } from 'react';
import UserListDetail from "./UserListDetail";

export default class UserListCard extends Component {

  state = {
    detailView: false
  }

  toggleDetailView = () => {
    this.setState({
      detailView: !this.state.detailView
    })
    console.log(this.state)
  }


  render() {
    return (<>
    <div className="tile is-parent">
    <article class="tile is-child notification is-primary">
        <p class="title">{ this.props.list.title }</p>
            <a class="button is-light" onClick={() => this.toggleDetailView()}>View</a>
          </article>
      </div>
      </>
    )
  }
}
