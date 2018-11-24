import React, { Component } from 'react'

export default class Nav extends Component {


  render() {
    return (
            <div className="tabs">
                <ul>
                    <li className="is-active"><a>Pictures</a></li>
                    <li><a>Music</a></li>
                    <li><a>Videos</a></li>
                    <li><a>Documents</a></li>
                </ul>
            </div>
    )
  }
}
