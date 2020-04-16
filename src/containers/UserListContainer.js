import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM, { render } from "react-dom";
import { listActions } from "../actions";
import { authHeader } from "../helpers";
import UserListDetail from "../components/UserListDetail";
import { history } from "../helpers";
import Notifications, { notify } from "react-notify-toast";

class UserListContainer extends Component {
  deleteListItem = () => {
    this.props.deleteListItem();
    notify.show("List item was deleted", "warning");
    this.props.resetSelectedList();
  };

  deleteAList = (list) => {
    this.props.deleteList(list);
    notify.show("List was deleted", "warning");
    window.location.reload();
  };

  render() {
    return (
      <UserListDetail
        list={this.props.list}
        deleteListItem={this.deleteListItem}
        deleteAList={this.deleteAList}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteList: (list) => dispatch(listActions.deleteList(list)),
  deleteListItem: (listItem) => dispatch(listActions.deleteListItem(listItem)),
  usersLists: () => dispatch(listActions.getUsersLists()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);
