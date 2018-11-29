import React, { Component, Fragment } from 'react'
import FullTextModal from './FullTextModal'
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { listActions } from "../actions";
import { contactInfoActions } from "../actions";
import Notifications, { notify } from "react-notify-toast";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedList: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    this.props.saveSearchResultToList();
    console.log(this.props.saveSearchResultToList());
  };

  selectList = list => {
    this.setState({
      selectedList: list
    });
    console.log(this.state);
  };

  openModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  closeModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };


  getContactInfo = () => {
    let { result } = this.props;
    let speakerId = result.speaker.person_id
    console.log(speakerId)
    this.props.getContactInfo(speakerId)
    console.log(contactInfoActions.getContactInfo(speakerId));
  }

  saveToList = () => {
    //dispatch action to add result to List
    let { result } = this.props;
    let listToSaveTo = this.state.selectedList
    console.log(listToSaveTo);
    const listItemDetails = {
      body: result.body,
      extract: result.extract,
      date: result.hdate,
      speaker: result.speaker.name,
      speakerParty: result.speaker.party,
      speakerId: result.speaker.member_id,
      speakerCons: result.speaker.constituency,
      debate: result.parent.body
    };
    console.log(listItemDetails);
    console.log(listToSaveTo.id);
    this.props.saveSearchResultToList(listItemDetails, listToSaveTo.id);
    notify.show("Saved to list!", "success");
  };

  removeHTMLfromExtract = props => {
    // possibility to make the keyword bold
    let extractBody = this.props.result.extract;
    let newText = extractBody.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");
    let newText2 = newText.replace("&#8212", "");
    return newText;
  };

  removeHTMLfromFullText = props => {
    // possibility to make the keyword bold
    let searchTerm = this.props.searchTerm;
    let fullTextBody = this.props.result.body;
    let textObj = { cat: "&#8212", dog: "&ldquo", goat: "&rsquo;", goat: "h&mdash;" };
    let regex = /(<([^>]+)>)/gi;
    
    let result = fullTextBody.replace(regex, "")
    return result;
  };

  render() {
    const { result } = this.props;
    const { openModal, closeModal, saveToList, getContactInfo } = this;
    return <>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {result.speaker ? result.speaker.name : null} - {result.parent ? result.parent.body : null}
            </p>
          </header>

          <div className="card-content">
            <div className="content">
              {this.removeHTMLfromExtract()}
              <br />
              <i>
                <time datetime={result.hdate}>{result.hdate} </time>
              </i>
            </div>
          </div>

          <footer className="card-footer">
            <div class="field is-grouped">
              <div className="column">
                <div className="dropdown is-hoverable">
                  <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                      <span>Select a list</span>
                      <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true" />
                      </span>
                    </button>
                  </div>

                  {this.state.selectedList !== null && <button className="button is-success" onClick={() => saveToList()}>
                  Save to {'  '}<b> {this.state.selectedList.title} </b>
                    </button>}

                  <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                    <div className="dropdown-content">
                      {this.props.userlist && this.props.userlist.lists.map(
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
                              {list.title}
                            </a>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <button className="button is-primary" onClick={() => openModal()}>
                  View full text
                </button>
              </div>

            <div className="column">
              <button className="button is-dark" onClick={() => getContactInfo()}>
                View contact information
                </button>
            </div>


              <div className="column">
                <button className="button is-link" onClick={() => {
                    navigator.clipboard.writeText(this.removeHTMLfromFullText());
                    notify.show("Copied to clipboard!", "success");
                  }}>
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </footer>
        </div>

        <FullTextModal isOpen={this.state.showModal} speaker={result.speaker} closeModal={closeModal} openModal={openModal} fullText={this.removeHTMLfromFullText()} />
      </>;
  }
}

const mapStateToProps = state => {
  return {
    userlist: state.userlist

  };
};


const mapDispatchToProps = dispatch => ({
  saveSearchResultToList: (listItemDetails, listid) => dispatch(listActions.addToList(listItemDetails, listid)),
  usersLists: () => dispatch(listActions.getUsersLists()),
  getContactInfo: (speakerId) => dispatch(contactInfoActions.getContactInfo(speakerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);