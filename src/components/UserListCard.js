import React, { Component } from 'react';
import UserListDetail from "./UserListDetail";
import { listActions } from "../actions";
import { connect } from "react-redux";

class UserListCard extends Component {

  state = {
    detailView: false
  }

  toggleDetailView = () => {
    this.setState({
      detailView: !this.state.detailView
    })
    console.log(this.state)
  }

  deleteListItem = (listItem) => {
    this.props.deleteListItem(listItem)
  }


  render() {
    return (<>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {this.props.listItem.speaker} ({this.props.listItem.speakerParty} -
                            {this.props.listItem.speakerCons
                ? this.props.listItem.speakerCons
                : " House of Lords"}
              )
                          </p>
          </header>
          <div className="card-content">
            <h2 className="subtitle"> {this.props.listItem.debate} </h2>
            <div className="content">
              {this.props.listItem.extract ? this.props.listItem.extract : this.props.listItem.body}
              <br />
              <time datetime="2016-1-1"> {this.props.listItem.date} </time>
            </div>
          </div>

          <footer className="card-footer">
            <a class="button is-light" onClick={() => this.toggleDetailView()}>View</a>
            <a className="button-is-light" onClick={() => this.deleteListItem(this.props.listItem)}>
              Delete from list </a>
          </footer>
        </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteListItem: listItem => dispatch(listActions.deleteListItem(listItem))
});

export default connect(null, mapDispatchToProps)(UserListCard)