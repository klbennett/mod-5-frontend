import React, { Component } from 'react'
import { connect } from 'react-redux'
import response from '../response'
import { hansardActions }  from "../actions";
import fetchHansard from "../actions";
import { hansard } from '../reducers/hansard.reducer';
import { bindActionCreators } from 'react'

class SearchBox extends Component {
  // Concerned with taking user input and using it as a keyword to search the api

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    const searchTerm = this.state.searchTerm;
    console.log(searchTerm)
    this.props.storeSearchResults(searchTerm);
    // Why am I unable to access dispatch?
    console.log(this.props.storeSearchResults(searchTerm))
    
  }
    

  render() {
    return (
    <div>

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
    )}
}

const mapDispatchToProps = dispatch => ({
 storeSearchResults: (searchTerm) => dispatch(hansardActions.fetchHansard(searchTerm))
});

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchHansard: bindActionCreators(hansardActions.fetchHansard, dispatch)
//   };
// }

export default connect(null, mapDispatchToProps)(SearchBox);