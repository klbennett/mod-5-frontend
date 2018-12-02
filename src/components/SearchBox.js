import React, { Component } from 'react'
import { connect } from 'react-redux'
import response from '../response'
import { hansardActions }  from "../actions";
import { history } from "../helpers/history";
import Notifications, { notify } from "react-notify-toast";

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
    console.log(this.props.storeSearchResults(searchTerm))
    notify.show("Loading results...", "warning");
  }
    

  render() {
    return <div>
        <div className="level-item">
          <div className="field has-addons">
            <p className="control">
              <input className="input is-medium" type="text" placeholder="Search" onChange={e => this.setState(
                    { searchTerm: e.target.value }
                  )} />
            </p>
            <p className="control">
              <button className="button is-medium" type="submit" value="Submit" onClick={this.handleSubmit}>
                <i class="fas fa-search"></i>
              </button>
            </p>
          </div>
        </div>
      </div>;}
}

const mapDispatchToProps = dispatch => ({
 storeSearchResults: (searchTerm) => dispatch(hansardActions.fetchHansard(searchTerm))
});

export default connect(null, mapDispatchToProps)(SearchBox);