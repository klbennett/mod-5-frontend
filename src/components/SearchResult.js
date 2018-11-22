import React, { Component, Fragment } from 'react'
import FullTextModal from './FullTextModal'
import ReactDOM from 'react-dom';

export default class SearchResult extends Component {

    state = {
        showModal: true
    };

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
        console.log('hi')
    }


    removeHTMLfromExtract = (props) => {
    // possibility to make the keyword bold
    let extractBody = this.props.result.extract
    let regex = /(<([^>]+)>)/ig
    let result = extractBody.replace(regex, "")
    return result;
    }


  render() {
      const { result } = this.props
      const { toggleModal } = this
    return(
    <>
    <div className="card">

        <header className="card-header">
          <p className="card-header-title">
            {result.speaker ? result.speaker.name : null}
          </p>

          <a href="http://google.com" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true" />
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

    <FullTextModal show={this.state.showModal}>
        <p>Modal</p>
        <p>Data</p>
    </FullTextModal>

        <footer className="card-footer">
          <a href="http://google.com" className="card-footer-item">
            Save
          </a>

        <button className="button is-primary" onClick={() => toggleModal()}>
            Open Modal
          </button>

          <a href="http://google.com" className="card-footer-item">
            {" "}
            Delete{" "}
          </a>
        </footer>
      </div>
      </>
    )
  }


}
