import React, { Component } from 'react';
import Notifications, { notify } from "react-notify-toast";


export default class PoliticianDetailModal extends Component {


  render() {

    return <div className={this.props.isOpen === true ? "modal is-active" : "modal"}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Contact <b>{this.props.person && this.props.person.name}</b>
              <br />
            </p>
          </header>

          <section className="modal-card-body">
            <div class="content">
              <figure class="image is-128x128">
                {this.props.person && (
                  <img
                    className="is-rounded"
                    src={this.props.person.image}
                    alt={this.props.person.name}
                  />
                )}
              </figure>
              <ul>
                {this.props.person.contact_details ? this.props.person.contact_details.map(
                      contactInfo => <li> {contactInfo.value}</li>
                    ) : null}
                {/* { this.props.speaker.office && this.props.speaker.office.position.map(position => <li> {position}</li>)} } */}
              </ul>

              {this.props.person.links && <a
                  href={this.props.person.links[0].url}
                >
                  View on Wiki
                </a>}
            </div>
          </section>

          <footer className="modal-card-foot">
            {/* <button className="button is-success" onClick={() => this.props.saveToList(this)}>Save to list</button> */}
            <button className="button" aria-label="close" onClick={() => this.props.toggleModal()}>
              Close
            </button>
          </footer>
        </div>
      </div>;
  }

}
