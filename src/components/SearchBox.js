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
  }
    

  render() {
    return <div>
      <input class="input" type="text" placeholder="Search" onChange={(e) => this.setState({ searchTerm: e.target.value } )} />
        <input class="button" type="submit" value="Submit" onClick={this.handleSubmit} />
      </div>;
  }

}
export default connect()(SearchBox);