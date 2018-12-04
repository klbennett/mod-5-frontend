import React, { Component } from 'react'

export default class FullTextModal extends Component {
    
    render() {

    return <div className={this.props.isOpen === true ? "modal is-active" : "modal"}>
        <div className="modal-background" />
        <div className="modal-card">

          <header className="modal-card-head">
            <p className="modal-card-title">
              { this.props.speaker && this.props.speaker.name }
          </p>

            <div class="field is-grouped">
            <div class="tags has-addons">
              { this.props.speaker.party && 
                <><span class="tag">Party</span>
                  <span class="tag is-primary">{this.props.speaker.party}</span></> }
              { this.props.speaker.constituency &&
                <><span class="tag">Constituency</span>
                  <span class="tag is-dark">{this.props.speaker.constituency}</span></> }
            </div>
            </div>
          </header>

          <section className="modal-card-body">
            {/* {(this.props.speaker && this.props.speaker.office) ? this.props.speaker.office.map( position => <p>{position}</p> ) : null } */}
            <p>{this.props.fullText}</p>
          </section>

          <footer className="modal-card-foot">
            <button className="button" aria-label="close" onClick={() => this.props.toggleModal()}>
              Close
            </button>
          </footer>
        </div>
      </div>;
    }

}
    