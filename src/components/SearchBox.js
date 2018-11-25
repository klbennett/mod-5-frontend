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

  handleSubmit = (dispatch) => {
    const searchTerm = this.state.searchTerm;
    // this.props.dispatch(hansardActions.fetchHansard(searchTerm))
    console.log(hansardActions.fetchHansard(searchTerm)) 
    console.log(this.props)
  }
    

  render() {
    return (<div>

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
    </div>)}
}

const mapDispatchToProps = dispatch => ({
 onClick: (event) => dispatch(hansardActions.fetchHansard(this.state.searchTerm))
});

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchHansard: bindActionCreators(hansardActions.fetchHansard, dispatch)
//   };
// }

export default connect(null, mapDispatchToProps)(SearchBox);