import React, { Component } from 'react';
import { listActions } from "../actions";
import { connect } from 'react-redux';
import ReactDOM, { render } from "react-dom";
import UserListCard from './UserListCard';
import Notifications, { notify } from "react-notify-toast";

// export default
class UserListDetail extends Component {


  deleteAList() {
    this.props.deleteList(this.props.list)
    notify.show("List was deleted", "warning");
    window.location.reload();
  }

    render() {
        return <> 
            <div className="container">
              <nav className="level-left">
                <div className="level-item">
                  {this.props.list.title && <>
                      <h1 className="title is-5">
                        Your saved items for "{this.props.list.title}"
                      </h1>
                      <a className="button is-danger is-inverted" data-balloon-length="medium" data-balloon="Are you sure? Deleting this list will also delete all associated list items." data-balloon-pos="up" onClick={() => { this.deleteAList(this.props.list)}}>
                        Delete list
                      </a>
                    </>}
                </div>
              </nav>
              {this.props.list.user_details ? this.props.list.user_details.list_items.map(
                    li => ( <UserListCard listItem={li} key={li.id}/>
                      // <div className="card">
                      //   <header className="card-header">
                      //     <p className="card-header-title">
                      //       {li.speaker} ({li.speakerParty} -
                      //       {li.speakerCons
                      //         ? li.speakerCons
                      //         : " House of Lords"}
                      //       )
                      //     </p>
                      //   </header>
                      //   <div className="card-content">
                      //     <h2 className="subtitle"> {li.debate} </h2>
                      //     <div className="content">
                      //       {li.extract ? li.extract : li.body}
                      //       <br />
                      //       <time datetime="2016-1-1"> {li.date} </time>
                      //     </div>
                      //   </div>
                      //   <footer className="card-footer">
                      //     <a href="#" className="card-footer-item">
                      //       Edit
                      //     </a>
                      //     <a href={() => this.props.deleteListItem(this.props.list)} className="card-footer-item">
                      //       Delete from list
                      //     </a>
                      //   </footer>
                      // </div>
                    )
                  ) : null}
        </div> 
          </>;
    }
}

const mapStateToProps = state => {
  return {
    userlist: state.userlist
  };
};

const mapDispatchToProps = dispatch => ({
  deleteList: (list) => dispatch(listActions.deleteList(list)),
  getUsersLists: () => dispatch(listActions.getUsersLists())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListDetail)