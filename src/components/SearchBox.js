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
      searchTerm: "",
      type: "commons",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
      const { searchTerm, type } = this.state;
      console.log(searchTerm)
      this.props.storeSearchResults(searchTerm);
      console.log(this.props.storeSearchResults(searchTerm, type))
      notify.show("Loading results...", "warning");
  }

  onChange = (event) => {
    this.setState({
      type: event.target.value
    })
  }
    

  render() {
    return <div className="level-item">

      <div className="level-item">
          <div class="control">
          <div class="select is-medium">
            <select value={this.state.type} onChange={this.onChange}>
            <option value="commons">House of Commons</option>
            <option value="westminsterhall">Westminster Hall</option>
            <option value="lords">House of Lords</option>
            <option value="scotland">Scotland</option>
            <option value="northernireland">Northern Ireland</option>
            </select>
            </div>
          </div>
      </div>

      <div className="field has-addons">
        <p className="control">
          <input className="input is-medium" type="text" placeholder="Search" onChange={e => this.setState(
            { searchTerm: e.target.value }
          )} />
        </p>
        <p className="control">
          <button className="button is-medium" type="submit" value="Submit" onClick={this.handleSubmit}>
            <i class="fas fa-search" />
          </button>
        </p>
      </div>
    </div>;}
}

const mapDispatchToProps = dispatch => ({
 storeSearchResults: (searchTerm, type) => dispatch(hansardActions.fetchHansard(searchTerm, type))
});

export default connect(null, mapDispatchToProps)(SearchBox);