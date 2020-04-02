import React, { Component } from "react";
import UserListDetail from "./UserListDetail";
import { listActions } from "../actions";
import { connect } from "react-redux";
import Notifications, { notify } from "react-notify-toast";
import FullTextModal from "./FullTextModal";
import nlp from "compromise";

class UserListCard extends Component {
  state = {
    showFullTextModal: false
  };

  toggleFullTextModal = () => {
    this.setState({
      showFullTextModal: !this.state.showFullTextModal
    });
    console.log(this.state);
  };

  deleteListItem = listItem => {
    this.props.deleteListItem(listItem);
  };

  nlpKeywords = () => {
    let input = this.props.listItem.body;
    let doc = nlp(input)
      .topics()
      .out("array");
    const unique = doc.filter((v, i, a) => a.indexOf(v) === i);
    return unique.map(keyword => <span class="tag">{keyword}</span>);
  };

  render() {
    return (
      <>
        <div className="box">
          <header className="card-header">
            <p className="card-header-title">
              {this.props.listItem.speaker} ({this.props.listItem.speakerParty}{" "}
              -
              {this.props.listItem.speakerCons
                ? this.props.listItem.speakerCons
                : " House of Lords"}
              )
            </p>

            <FullTextModal
              isOpen={this.state.showFullTextModal}
              speaker={this.props.listItem.speaker}
              toggleModal={this.toggleFullTextModal}
              fullText={this.props.listItem.body}
            />
          </header>
          <div className="card-content">
            <h2 className="subtitle"> {this.props.listItem.debate} </h2>
            <div className="content">
              <div class="tags"> {this.nlpKeywords()}</div>
              {this.props.listItem.extract
                ? this.props.listItem.extract
                : this.props.listItem.body}

              <hr />
              <i class="far fa-calendar-alt" />
              <span>{this.props.listItem.date}</span>
            </div>
          </div>

          <div class="field is-grouped">
            <p class="control">
              <button
                className="button is-dark is-outlined is-hovered"
                onClick={() => this.toggleFullTextModal()}
              >
                View full text
              </button>
            </p>

            <p class="control">
              <a
                className="button is-danger is-outlined is-hovered"
                data-balloon-length="medium"
                data-balloon="Are you sure? This cannot be reversed."
                data-balloon-pos="up"
                onClick={() => this.deleteListItem(this.props.listItem)}
              >
                <span>Delete from list</span>
                <span class="icon is-small">
                  <i class="fas fa-times" />
                </span>
              </a>
            </p>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteListItem: listItem => dispatch(listActions.deleteListItem(listItem))
});

export default connect(null, mapDispatchToProps)(UserListCard);
