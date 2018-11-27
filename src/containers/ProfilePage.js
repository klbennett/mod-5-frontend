import React, { Component } from 'react'
import { connect } from "react-redux";


class ProfilePage extends Component {



  render() {
    return (
      <div>
            {this.props.authentication.loggedIn ? <p> You are logged in </p> : <p> You are not logged in </p>}
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


