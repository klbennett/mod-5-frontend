import React, { Component } from 'react'
import FullTextModal from './FullTextModal'
import PoliticianDetailModal from "./PoliticianDetailModal";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { listActions } from "../actions";
import { contactInfoActions } from "../actions";
import Notifications, { notify } from "react-notify-toast";

class SearchResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedList: null,
      showModal: false,
      showPoliticianModal: false
    };
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
  };

  openModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  closeModal = () => {
    this.setState({
      showModal: !this.state.showModal });
  };

  openPoliticianModal = () => {
    this.setState({
      showPoliticianModal: !this.state.showPoliticianModal
    });
  };

  closePoliticianModal = () => {
    this.setState({
      showPoliticianModal: !this.state.showPoliticianModal
    });
  };

  getContactInfo = () => {
    let { result } = this.props;
    let speakerId = result.speaker.person_id;
    this.props.getContactInfo(speakerId);
    console.log(contactInfoActions.getContactInfo(speakerId));
    this.setState((prevState, props) => ({ showPoliticianModal: !prevState.showPoliticianModal }))
  };

  saveToList = () => {
    //dispatch action to add result to List
    let { result } = this.props;
    let listToSaveTo = this.state.selectedList;
    console.log(listToSaveTo);
    const listItemDetails = {
      body: this.cleanText(result.body),
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

  // removeHTMLfromExtract = props => {
  //   // possibility to make the keyword bold
  //   let extractBody = this.props.result.extract;
  //   let newText = extractBody.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");
  //   return newText;
  // };

  cleanText = (text) => {
      //why does only one regex work, how can i combine.
      // ((&#[0-9])\w+)|(<\/?("[^"]*"|'[^']*'|[^>])*(>|$))
      // let result = text.replace(/((&#[0-9])\w+)|(<\/?("[^"]*"|'[^']*'|[^>])*(>|$))/, "");
    // let result = text.replace(/(&#[0-9])\d+/, "");
      return text;
    };

  render() {
    const { result } = this.props;
    const defaultPol = { birth_date: "1977-04-23", contact_details: [{ type: "email", value: "james.frith.mp@parliament.uk" }, { type: "phone", value: "0207 219 2907" }, { type: "twitter", value: "JamesFrith" }], email: "james.frith.mp@parliament.uk", family_name: "Frith", gender: "male", given_name: "James", id: "003c686d-f9a3-4b1b-92d1-d0e3c0222179", identifiers: [{ identifier: "4637", scheme: "datadotparl" }, { identifier: "106001", scheme: "dods" }, { identifier: "commons/james-frith/4637", scheme: "parliamentdotuk" }, { identifier: "uk.org.publicwhip/person/25622", scheme: "parlparse" }, { identifier: "6215", scheme: "pims" }, { identifier: "Q30163560", scheme: "wikidata" }], image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Official_portrait_of_James_Frith_crop_2.jpg", images: [{ url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Official_portrait_of_James_Frith_crop_2.jpg" }], links: [{ note: "Wikipedia (en)", url: "https://en.wikipedia.org/wiki/James_Frith" }, { note: "facebook", url: "https://facebook.com/JamesFrithBury" }, { note: "twitter", url: "https://twitter.com/JamesFrith" }, { note: "website", url: "http://www.jamesfrith.org/" }], name: "James Frith", sort_name: "Frith, James" }
    const { selectList, openModal, closeModal, saveToList, getContactInfo, openPoliticianModal, closePoliticianModal } = this;
    return <>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {result.speaker ? result.speaker.name : null} - {result.parent ? this.cleanText(result.parent.body) : null}
            </p>
          </header>

          <div className="card-content">
            <div className="content">
            {this.cleanText(result.extract)}
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
                      Save to <b>{this.state.selectedList.title}</b>
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
                              onClick={() => selectList(list)}
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
                <button className="button is-primary is-outlined" onClick={() => openModal()}>
                  View full text
                </button>
              </div>

              { result.speaker && result.speaker.house === "1" && <div className="column">
                <button className="button is-dark is-outlined" onClick={() => getContactInfo()}>
                  View speaker info
                </button>
                </div> }

              <div className="column">
                <button className="button is-link is-outlined" onClick={() => {
                navigator.clipboard.writeText(this.cleanText(result.body));
                    notify.show("Copied to clipboard!", "success");
                  }}>
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </footer>
        </div>

      <FullTextModal isOpen={this.state.showModal} speaker={result.speaker} closeModal={closeModal} fullText={this.cleanText(result.body)} />

      {this.props.speaker && <PoliticianDetailModal isOpen={this.state.showPoliticianModal} speaker={result.speaker} person={this.props.selectedPolitician} closeModal={closePoliticianModal} />}
      </>;
  }
}

const mapStateToProps = state => {
  return {
    // userlist: state.userlist,
    selectedPolitician: state.getContactInfo.selectedPolitician
  };
};


const mapDispatchToProps = dispatch => ({
  saveSearchResultToList: (listItemDetails, listid) => dispatch(listActions.addToList(listItemDetails, listid)),
  // usersLists: () => dispatch(listActions.getUsersLists()),
  getContactInfo: (speakerId) => dispatch(contactInfoActions.getContactInfo(speakerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);