import React, { Component } from 'react'

export default class UserListCard extends Component {
  render() {
    return (
            <div class="tile is-parent is-vertical">
                <article class="tile is-child notification is-primary">
                    <p class="title">{ this.props.title }</p>
                    <p class="subtitle">Top tile</p>
                </article>
                </div>  
    )
  }
}
