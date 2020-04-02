import React, { Component } from "react";
import FullTextModal from "./FullTextModal";
import PoliticianDetailModal from "./PoliticianDetailModal";
import { connect } from "react-redux";
import { listActions } from "../actions";
import { contactInfoActions } from "../actions";
import { notify } from "react-notify-toast";
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = () => {
    this.props.saveSearchResultToList();
  };

  handleChange(event) {
    this.setState({
      selectedList: JSON.parse(event.target.value)
    });
  }

  toggleFullTextModal = () => {
    this.setState({
      showFullTextModal: !this.state.showFullTextModal
    });
  };

  getContactInfo = () => {
    let { result } = this.props;
    let speakerId = result.speaker.person_id;
    this.props.getContactInfo(speakerId);
  };

  togglePoliticianModal = () => {
    // this.getContactInfo();

    this.setState({
      showPoliticianModal: !this.state.showPoliticianModal
    });
  };

  saveToList = () => {
    // dispatch action to add result to List
    let { result } = this.props;
    let listToSaveTo = this.state.selectedList;
    const listItemDetails = {
      body: this.props.cleanText(result.body),
      extract: this.props.cleanText(result.extract),
      date: result.hdate,
      speaker: result.speaker.name,
      speakerParty: result.speaker.party,
      speakerId: result.speaker.member_id,
      speakerCons: result.speaker.constituency,
      debate: result.parent.body
    };
    console.log(this.state.selectedList);
    console.log(listToSaveTo.id);
    this.props.saveSearchResultToList(listItemDetails, listToSaveTo.id);
    notify.show("Saved to list!", "success");
  };

  nlpKeywords = () => {
    let input = this.props.cleanText(this.props.result.body);
    let doc = nlp(input)
      .topics()
      .out("array");
    const unique = doc.filter((v, i, a) => a.indexOf(v) === i);
    return unique.map(keyword => <span class="tag">{keyword}</span>);
  };

  render() {
    const { result, cleanText, userlist } = this.props;
    const { selectedList } = this.state;
    const {
      handleChange,
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
              {result.speaker.party ? (
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
                {result.parent ? cleanText(result.parent.body) : null}{" "}
              </h2>
              {cleanText(result.extract)}
              <hr />
              <i class="far fa-calendar-alt" />
              <span>{result.hdate}</span>
            </div>
          </div>

          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                {userlist.lists && (
                  <div class="select">
                    <select value={selectedList} onChange={handleChange}>
                      <option value="">Select a list</option>
                      {userlist.lists.map(list => (
                        <option value={JSON.stringify(list)}>
                          {list.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedList && (
                  <button className="button is-success" onClick={saveToList}>
                    <span>
                      {" "}
                      Save to <b>{selectedList.title}</b>
                    </span>
                  </button>
                )}

                <div class="level-item">
                  <div
                    className="dropdown-menu"
                    id="dropdown-menu4"
                    role="menu"
                  >
                    {this.props.userlist &&
                      this.props.userlist.lists.map(list => (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid

                        <p>{list.title}</p>
                      ))}
                  </div>
                </div>
              </div>

              <div class="level-item">
                <button
                  className="button is-primary is-outlined"
                  onClick={() => toggleFullTextModal()}
                >
                  View full text
                </button>
              </div>

              {/* {result.speaker && result.speaker.house === "1" && (
                <div className="column">
                  <button
                    className="button is-dark is-outlined"
                    onClick={() => togglePoliticianModal()}
                  >
                    View speaker info
                  </button>
                </div>
              )} */}
              <div class="level-item">
                <button
                  className="button is-link is-outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(cleanText(result.body));
                    notify.show("Copied to clipboard!", "success");
                  }}
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </nav>
        </div>

        <FullTextModal
          isOpen={this.state.showFullTextModal}
          speaker={result.speaker}
          toggleModal={toggleFullTextModal}
          fullText={cleanText(result.body)}
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
    // userlist: state.userlist,
    selectedPolitician: state.getContactInfo.selectedPolitician
  };
};

const mapDispatchToProps = dispatch => ({
  saveSearchResultToList: (listItemDetails, listid) =>
    dispatch(listActions.addToList(listItemDetails, listid)),
  // usersLists: () => dispatch(listActions.getUsersLists()),
  getContactInfo: speakerId =>
    dispatch(contactInfoActions.getContactInfo(speakerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
