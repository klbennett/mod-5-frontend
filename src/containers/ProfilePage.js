import React, { Component } from 'react'
import { connect } from "react-redux";
import UserListContainer from '../components/UserListDetail';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
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
    return <>

    { !this.props.authentication.user && <Redirect to="/"/> }
      <h1 className="title is-3">Your profile page</h1>
    <div className="container is-fluid">
    
        

        <nav class="level">
    
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Saved lists</p>
              <p class="title"> {this.props.userlist.lists.length} </p>
            </div>
          </div>

        <div class="level-item has-text-centered">
        <div className="dropdown is-hoverable">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
              <span>Select a list to view details</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>

          <div className="dropdown-menu" id="dropdown-menu4" role="menu">
            <div className="dropdown-content">
              { this.props.userlist && this.props.userlist.lists.map(
                list => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a
                    className={
                      this.state.selectedList === list
                        ? "dropdown-item is-active"
                        : "dropdown-item"
                    }
                    onClick={() => this.selectList(list)}
                  >
                   <h2 class="subtitle">{list.title}</h2>
                  </a>
                )
              )}
            </div>
          </div>
          </div>
          </div>


      </nav>
        

       
          
    </div>
        <UserListContainer user={this.props.authentication.user} list={this.state.selectedList} />
        {/* {(this.props.authentication.loggedIn && !this.props.userlist.lists) ? <h2 is-large> You do not have any lists saved yet.</h2> : <h2 is-large> Your saved lists </h2>} */}
      </>
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


