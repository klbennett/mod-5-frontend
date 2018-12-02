import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { listActions } from "../actions";
import Notifications, { notify } from "react-notify-toast";

class ListCreationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newListTitle: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

handleSubmit = () => {
    this.props.createList(this.state.newListTitle);
    console.log(this.state.newListTitle)
    notify.show("Created list!", "success");
//     notify.show(notify.show("Could not create list. Your list title should be at least 6 characters long.", "error"))
}

  onBlur = (event) => {
    this.setState({ newListTitle: event.target.value });
}


  render() {
    return <>
        <h1> Create a list to save your search results </h1>
        <div className="field has-addons">
          <div className="control">
            <input className="input" type="text" placeholder="Enter title" onChange={e => this.setState({ newListTitle: e.target.value })} />
          </div>
          <div className="control">
            <a href className="button is-info" onClick={this.handleSubmit}>
              Create
            </a>
          </div>
        </div>
      </>;
  }
}

const mapDispatchToProps = dispatch => ({
    createList: (title) => dispatch(listActions.createList(title)),
    getUsersLists: () => dispatch(listActions.getUsersLists())
});


export default connect(null, mapDispatchToProps)(ListCreationForm)