import React, { Component } from "react";
import { listActions } from "../actions";
import { connect } from "react-redux";
import ReactDOM, { render } from "react-dom";
import UserListCard from "./UserListCard";
import Notifications, { notify } from "react-notify-toast";

// export default
class UserListDetail extends Component {
  deleteListItem = (listItem) => {
    this.deleteListItem(listItem);
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="level-item">
            {this.props.list.title && (
              <>
                <h1 className="title is-5">
                  Your saved items for "{this.props.list.title}"
                </h1>
                <a
                  className="button is-danger is-inverted"
                  data-balloon-length="medium"
                  data-balloon="Are you sure? Deleting this list will also delete all associated list items."
                  data-balloon-pos="up"
                  onClick={() => this.props.deleteAList(this.props.list)}
                >
                  Delete list
                </a>
              </>
            )}
          </div>
          <div className="container is-fluid">
            {this.props.list.list_items
              ? this.props.list.list_items.map((li) => (
                  <UserListCard
                    listItem={li}
                    key={li.id}
                    deleteListItem={this.deleteListItem(li)}
                  />
                ))
              : null}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userlist: state.userlist,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteListItem: (listItem) => dispatch(listActions.deleteListItem(listItem)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListDetail);
