import React, { Component, Fragment } from 'react'
import FullTextModal from './FullTextModal'
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { listActions } from "../actions";

class SearchResult extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    this.props.saveSearchResultToList();
    console.log(this.props.saveSearchResultToList())
  }

    openModal = () => {
        this.setState({
          showModal: !this.state.showModal
        })
    }

    closeModal = () => {
      this.setState({ showModal: !this.state.showModal });
    }

    saveToList = () => {
      //dispatch action to add result to List
      let { result } = this.props
      console.log('save to list was clicked')
      const listItemDetails = {
        body: result.body,
        extract: result.extract,
        date: result.hdate,
        speaker: result.speaker.name,
        speakerParty: result.speaker.party,
        speakerId: result.speaker.member_id,
        speakerCons: result.speaker.constituency,
        debate: result.parent.body
      }
      console.log(listItemDetails)
      this.props.saveSearchResultToList(listItemDetails);
    }

    removeHTMLfromExtract = (props) => {
    // possibility to make the keyword bold
      let extractBody = this.props.result.extract
      let regex = /(<([^>]+)>)/ig
      let result = extractBody.replace(regex, "")
      return result;
    }

  removeHTMLfromFullText = (props) => {
    // possibility to make the keyword bold
      let fullTextBody = this.props.result.body
      let regex = /(<([^>]+)>)/ig
      let result = fullTextBody.replace(regex, "")
      return result;
    }


  render() {
      const { result } = this.props
      const { openModal, closeModal, saveToList } = this
    return (<>
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
            <i><time datetime={result.hdate}>{result.hdate} </time></i>
            </div>
          </div>

          <footer className="card-footer">

          <div class="field is-grouped">

              <div class="column">
              <button className="button is-success" onClick={() => saveToList()}>Save</button>
              </div>

            <div class="dropdown is-active">

              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Dropdown button</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>

              {/* {this.props.users.lists && this.props.users.lists.map(list =>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item">
                    Dropdown item
                   </a>
                </div>
              </div> )} */}

              </div>
    

              <div className="column">
                <button className="button is-primary" onClick={() => openModal()}>
                  View full text
                </button>
              </div>

              <div className="column">
                <button className="button is-link" onClick={() => {
                navigator.clipboard.writeText(this.removeHTMLfromFullText());
                  }}>
                  Copy to Clipboard
                </button>
              </div>

            </div> 

          </footer>
          </div>

        <FullTextModal isOpen={this.state.showModal} speaker={result.speaker} closeModal={closeModal} openModal={openModal} fullText={this.removeHTMLfromFullText()} />
      </>
  )
  }

}

const mapDispatchToProps = dispatch => ({
  saveSearchResultToList: (searchResult) => dispatch(listActions.addToList(searchResult, 1))
});

export default connect(null, mapDispatchToProps)(SearchResult);