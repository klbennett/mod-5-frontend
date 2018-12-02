import React, { Component } from 'react'

export default class FullTextModal extends Component {
    
    render() {

    return <div className={this.props.isOpen === true ? "modal is-active" : "modal"}>

        <div className="modal-background" />
        <div className="modal-card">

          <header className="modal-card-head">
                <p className="modal-card-title">
                { this.props.speaker && this.props.speaker.name } -
                { this.props.speaker && this.props.speaker.party}
                <br/>
                </p>
          </header>

          <section className="modal-card-body">
          {/* { this.props.speaker.office && this.props.speaker.office.position.map(position => <li> { position}</li>)} */}
            <p>{this.props.fullText}</p>
          </section>

          <footer className="modal-card-foot">
            <button className="button" aria-label="close" onClick={() => this.props.closeModal()}>
              Close
            </button>
          </footer>

        </div>
      </div>;
    }

}
    