import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM, { render } from "react-dom";
import { listActions } from "../actions";
import { authHeader } from "../helpers";
import UserListDetail from "../components/UserListDetail";
import { history } from "../helpers";
import Notifications, { notify } from "react-notify-toast";

class UserListContainer extends Component {

    deleteListItem = () => {
        this.props.deleteListItem();
        notify.show("List iten was deleted", "warning");
    }

    deleteAList = (list) => {
        this.props.deleteList(list);
        notify.show("List was deleted", "warning");
        console.log('hi from ulc')
        window.location.reload();
    }

    render() {
        return (
           <UserListDetail list={this.props.list} deleteListItem={this.props.deleteListItem} deleteAList={this.deleteAList}/> 
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userlist: state.userlist,
        authentication: state.authentication
    }
}

const mapDispatchToProps = dispatch => ({
  deleteList: list => dispatch(listActions.deleteList(list)),
  deleteListItem: listItem => dispatch(listActions.deleteListItem(listItem)),
  usersLists: () => dispatch(listActions.getUsersLists())
});


export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);