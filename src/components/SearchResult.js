import React, { Component } from "react";
import FullTextModal from "./FullTextModal";
import PoliticianDetailModal from "./PoliticianDetailModal";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { listActions } from "../actions";
import { contactInfoActions } from "../actions";
import Notifications, { notify } from "react-notify-toast";
import nlp from "compromise";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: null,
      showFullTextModal: false,
      showPoliticianModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    this.props.saveSearchResultToList();
  };

  selectList = list => {
    this.setState({
      selectedList: list
    });
  };

  toggleFullTextModal = () => {
    this.setState({
      showFullTextModal: !this.state.showFullTextModal
    });
  };

  getContactInfo = () => {
    let { result } = this.props;
    let speakerId = result.speaker.person_id;
    this.props.getContactInfo(speakerId);
    console.log(contactInfoActions.getContactInfo(speakerId));
  };

  togglePoliticianModal = () => {
    this.getContactInfo();

    this.setState({
      showPoliticianModal: !this.state.showPoliticianModal
    });
  };

  saveToList = () => {
    // dispatch action to add result to List
    let { result } = this.props;
    let listToSaveTo = this.state.selectedList;
    const listItemDetails = {
      body: this.cleanText(result.body),
      extract: this.cleanText(result.extract),
      date: result.hdate,
      speaker: result.speaker.name,
      speakerParty: result.speaker.party,
      speakerId: result.speaker.member_id,
      speakerCons: result.speaker.constituency,
      debate: result.parent.body
    };
    this.props.saveSearchResultToList(listItemDetails, listToSaveTo.id);
    notify.show("Saved to list!", "success");
  };

  cleanText = text => {
    let result = text.replace(
      /((&#[0-9])\w+)|(<\/?("[^"]*"|'[^']*'|[^>])*(>|$))/g,
      ""
    );
    return result;
  };

  nlpKeywords = () => {
    let input = this.cleanText(this.props.result.body);
    let doc = nlp(input)
      .topics()
      .out("array");
    console.log(doc);
    const unique = doc.filter((v, i, a) => a.indexOf(v) === i);
    return unique.map(keyword => <span class="tag">{keyword}</span>);
  };

  render() {
    const { result } = this.props;
    const {
      selectList,
      toggleFullTextModal,
      saveToList,
      togglePoliticianModal
    } = this;
    return (
      <>
        <div className="box">
          <header className="card-header">
            <p className="card-header-title">
              {result.speaker ? result.speaker.name : null}
              {result.speaker ? (
                <div class="tags has-addons">
                  {" "}
                  <span class="tag">Party</span>
                  <span class="tag is-primary">{result.speaker.party}</span>
                </div>
              ) : null}
            </p>
          </header>

          <div className="card-content">
            <div className="content">
              <h2 className="subtitle is-6">
                <div class="tags"> {this.nlpKeywords()}</div>
                {result.parent ? this.cleanText(result.parent.body) : null}{" "}
              </h2>
              {this.cleanText(result.extract)}
              <hr />
              <i class="far fa-calendar-alt" />
              <span>{result.hdate}</span>
            </div>
          </div>

          <footer className="card-footer">
            <div class="field is-grouped">
              <div className="column">
                <div className="dropdown is-hoverable">
                  <div className="dropdown-trigger">
                    <button
                      className="button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu4"
                    >
                      <span>Select a list</span>
                      <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true" />
                      </span>
                    </button>
                  </div>

                  {this.state.selectedList !== null && (
                    <button
                      className="button is-success"
                      onClick={() => saveToList()}
                    >
                      <span>
                        {" "}
                        Save to <b>{this.state.selectedList.title}</b>
                      </span>
                    </button>
                  )}

                  <div
                    className="dropdown-menu"
                    id="dropdown-menu4"
                    role="menu"
                  >
                    <div className="dropdown-content">
                      {this.props.userlist &&
                        this.props.userlist.lists.map(list => (
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          <a
                            className={
                              this.state.selectedList === list
                                ? "dropdown-item is-active"
                                : "dropdown-item"
                            }
                            onClick={() => selectList(list)}
                          >
                            {list.title}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <button
                  className="button is-primary is-outlined"
                  onClick={() => toggleFullTextModal()}
                >
                  View full text
                </button>
              </div>

              {result.speaker && result.speaker.house === "1" && (
                <div className="column">
                  <button
                    className="button is-dark is-outlined"
                    onClick={() => togglePoliticianModal()}
                  >
                    View speaker info
                  </button>
                </div>
              )}

              <div className="column">
                <button
                  className="button is-link is-outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(this.cleanText(result.body));
                    notify.show("Copied to clipboard!", "success");
                  }}
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </footer>
        </div>

        <FullTextModal
          isOpen={this.state.showFullTextModal}
          speaker={result.speaker}
          toggleModal={toggleFullTextModal}
          fullText={this.cleanText(result.body)}
        />

        {result.speaker && (
          <PoliticianDetailModal
            isOpen={this.state.showPoliticianModal}
            speaker={result.speaker}
            person={this.props.selectedPolitician}
            toggleModal={togglePoliticianModal}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userlist: state.userlist,
    selectedPolitician: state.getContactInfo.selectedPolitician
  };
};

const mapDispatchToProps = dispatch => ({
  saveSearchResultToList: (listItemDetails, listid) =>
    dispatch(listActions.addToList(listItemDetails, listid)),
  usersLists: () => dispatch(listActions.getUsersLists()),
  getContactInfo: speakerId =>
    dispatch(contactInfoActions.getContactInfo(speakerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
