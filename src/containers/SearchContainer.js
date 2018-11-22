import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchBox from '../components/SearchBox'


export class SearchContainer extends Component {

    getInfo = () => {
    fetch('https://www.theyworkforyou.com/api/getHansard?search=diabetes&key=AoGBodDXTcTtBNwGn8AytXeB')
        .then(resp => resp.json())
        .then(searchResults => this.setState({ searchResults }))
        .catch(error => console.log('Fetch was unsuccessful - ' + error))
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
    }

  render() {
    return (
      <div>
        <SearchBox/> 
      </div>
    )
  }
}
