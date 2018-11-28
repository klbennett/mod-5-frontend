import React, { Component } from 'react'
import { connect } from "react-redux";
import UserListContainer from '../components/UserListDetail';
import { listActions } from "../actions";
import { authHeader } from "../helpers";
import UserListCard from "../components/UserListCard";


class ProfilePage extends Component {

  state = {
    selectedList: []
  };

  selectList = (list) => {
    this.setState({
      selectedList: list
    });
    console.log(this.state);
  };

  componentDidMount() {
    this.props.usersLists();
  }

  render() {
    return <div className="container is-fluid">
        {this.props.authentication.loggedIn ? <p>
            {" "}
            You are now logged in.
          </p> : <p> You are not logged in </p>}

        <div className="dropdown is-hoverable">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
              <span>Select a list</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>

          <div className="dropdown-menu" id="dropdown-menu4" role="menu">
            <div className="dropdown-content">
              {this.props.userlist.lists.map(list => (
                <div
                  className="dropdown-item"
                  onClick={() => this.selectList(list)}>
                  <p>{list.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <UserListContainer user={this.props.authentication.user} list={this.state.selectedList} />
        {/* {(this.props.authentication.loggedIn && !this.props.userlist.lists) ? <h2 is-large> You do not have any lists saved yet.</h2> : <h2 is-large> Your saved lists </h2>} */}
      </div>;
  }
}


const mapStateToProps = (state) => {
  return {
    userlist: state.userlist,
    authentication: state.authentication
  }
}

const mapDispatchToProps = dispatch => ({
  usersLists: () => dispatch(listActions.getUsersLists())
})


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)


