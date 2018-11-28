import React, { Component } from 'react'
import { connect } from "react-redux";
import { UserListContainer } from './UserListContainer';


class ProfilePage extends Component {



  render() {
    return (
      <div>
            {this.props.authentication.loggedIn ? <p> You are now logged in</p> : <p> You are not logged in </p>}
            <UserListContainer user={this.props.authentication.user}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return { 
      authentication: state.authentication
    };
};


export default connect(mapStateToProps)(ProfilePage)


