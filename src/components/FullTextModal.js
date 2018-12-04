import React, { Component } from 'react'

export default class FullTextModal extends Component {
    
    render() {

    return <div className={this.props.isOpen === true ? "modal is-active" : "modal"}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
            <div class="field is-grouped">
              {this.props.speaker && this.props.speaker.name}
              <br />
              {this.props.speaker.party && <div class="tags has-addons">
                  {" "}
                  <span class="tag">Party</span>
                  <span class="tag is-primary">
                    {this.props.speaker.party}
                  </span>
                </div>}
              {this.props.speaker.constituency && <div class="tags has-addons">
                  {" "}
                  <span class="tag">Constituency</span>
                  <span class="tag is-dark">
                    {this.props.speaker.constituency}
                  </span>
                </div>}
            </div>
            </p>
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
    