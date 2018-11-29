import React, { Component } from 'react'

export default class FullTextModal extends Component {
    
    render() {

    return <div className={this.props.isOpen === true ? "modal is-active" : "modal"}>

        <div className="modal-background" />
        <div className="modal-card">

          <header className="modal-card-head">
                <p className="modal-card-title">
                { this.props.speaker && this.props.speaker.name } -
                { this.props.speaker && this.props.speaker.constituency}
                <br/>
                </p>
          </header>

          <section className="modal-card-body">
            <p>{this.props.fullText}</p>
          </section>

          <footer className="modal-card-foot">
          <button className="button is-success" onClick={() => this.props.saveToList(this)}>Save to list</button>
            <button className="button" aria-label="close" onClick={() => this.props.closeModal()}>
              Close
            </button>
          </footer>

        </div>
      </div>;
    }

}
    