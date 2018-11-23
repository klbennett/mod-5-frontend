import React, { Component, Fragment } from 'react'
import FullTextModal from './FullTextModal'
import ReactDOM from 'react-dom';

export default class SearchResult extends Component {

    state = {
        showModal: false
    };

    openModal = () => {
        this.setState({
          showModal: !this.state.showModal
        })
    }

    closeModal = () => {
      this.setState({ showModal: !this.state.showModal });
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
      const { openModal, closeModal } = this
    return <>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {result.speaker ? result.speaker.name : null} - {result.parent ? result.parent.body : null}
            </p>

            <a href="http://google.com" className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true" />
                {/* <i> {result.speaker && result.speaker.constituency} </i> */}
              </span>
            </a>
          </header>

          <div className="card-content">
            <div className="content">
              {this.removeHTMLfromExtract()}
              <br />
              <time datetime={result.hdate}>{result.hdate} </time>
            </div>
          </div>

          <footer className="card-footer">
          <div class="field is-grouped">
              <div class="column">
                <button className="button is-success">Save</button>
              </div>

              <div class="column">
                <button className="button is-primary" onClick={() => openModal()}>
                  View full text
                </button>
              </div>

              <div class="column">
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
      </>;
  }


}
