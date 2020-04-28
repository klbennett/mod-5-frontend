import React, { Component } from "react";
import { connect } from "react-redux";
import { listActions } from "../actions";
import UserListCard from "../components/UserListCard";
import { notify } from "react-notify-toast";

class UserListDetail extends Component {
  deleteAList = (list) => {
    this.props.deleteList(list);
    notify.show("List was deleted", "warning");
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
                    deleteListItem={() => this.props.deleteAListItem(li)}
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
    authentication: state.authentication,
    userlist: state.userlist,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteList: (list) => dispatch(listActions.deleteList(list)),
  // deleteListItem: (listItem) => dispatch(listActions.deleteListItem(listItem)),
  usersLists: () => dispatch(listActions.getUsersLists()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListDetail);
