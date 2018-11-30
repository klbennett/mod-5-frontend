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
        const newListTitle = this.state.newListTitle;
        this.props.createList(newListTitle);
        notify.show("Created list!", "success");
        this.props.usersLists();
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

const mapStateToProps = state => {
  return {
    userlist: state.userlist
  };
};


const mapDispatchToProps = dispatch => ({
    createList: (title) => dispatch(listActions.createList(title)),
    usersLists: () => dispatch(listActions.getUsersLists())
});


export default connect(mapStateToProps, mapDispatchToProps)(ListCreationForm)