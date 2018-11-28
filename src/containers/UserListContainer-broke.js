import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listActions } from "../actions";
import { authHeader } from "../helpers";
import { UserListCard } from '../components'

export class UserListContainer extends Component {

    componentDidMount() {
        // this.props.usersLists()

        const requestOptions = {
            method: "GET",
            headers: {
                ...authHeader(), "Content-Type": "application/json", "mode": "no-cors"
            },
        };

        console.log("UserListContainer PROPS: ", this.props)

        fetch('http://localhost:3001/api/v1/userlists/', requestOptions)
        .then(resp => resp.json())
        .then(list => list.map(list => <UserListCard={list}/>) )
    }

    

  render() {
    return (
      <div>
        <h1> Hello from UserListContainer</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        test: "Just testing"
    }
}

const mapDispatchToProps = dispatch => { 
    return { 
        usersLists: () => dispatch(listActions.getUsersLists()) 
    } 
}



export default connect(mapStateToProps,mapDispatchToProps)(UserListContainer);

