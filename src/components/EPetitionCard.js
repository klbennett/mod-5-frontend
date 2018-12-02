import React, { Component } from 'react'

export class EPetitionCard extends Component {

    state = {

    }

    componentDidMount() {
        fetch('http://lda.data.parliament.uk/epetitions.json')
        .then(res => res.json())
        .then(data => console.log(data))
    }
        
  render() {
    return (
      <div>
        <h1>Hey</h1>
      </div>
    )
  }
}
