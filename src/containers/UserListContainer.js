import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM, { render } from "react-dom";
import { listActions } from "../actions";
import { authHeader } from "../helpers";
import UserListDetail from "../components/UserListDetail";

class UserListContainer extends Component {

    deleteList = () => {
        this.props.deleteList()
    }

    componentDidMount() {
        this.props.usersLists()
    }

    render() {
        return (
            <UserListDetail list={this.props.list} deleteList={this.deleteList}/>
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
  deleteList: listid => dispatch(listActions.deleteList(listid)),
  usersLists: () => dispatch(listActions.getUsersLists())
});


export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);