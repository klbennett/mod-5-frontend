import React, { Component } from 'react'
import { connect } from 'react-redux'
import response from '../response'
import { fetchHansard } from '../actions';

class SearchBox extends Component {
  // Concerned with taking user input and using it as a keyword to search the api

state = {
  searchTerm: ""
}

  handleSubmit = () => {
    const searchTerm = this.state.searchTerm;
    const searchresult = response
    fetchHansard(this.props.dispatch, response)
    console.log(response)
  }
    

  render() {
    return <div>

    <div className="level-item">
      <div className="field has-addons">
        <p className="control">
          <input className="input" type="text" placeholder="Search" onChange={(e) => this.setState({ searchTerm: e.target.value })} />
        </p>
          <p className="control">
          <button className="button" type="submit" value="Submit"  onClick={this.handleSubmit}>Search</button> 
          </p>
      </div>
      </div>
    </div>
  }

}
export default connect()(SearchBox);