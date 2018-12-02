import React, { Component } from 'react'

export default class PoliticianDetailModal extends Component {
  render() {

    return (<div className={this.props.isOpen === true ? "modal is-active" : "modal"}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              { this.props.person && this.props.person.name } 
              <br />
            </p>
          </header>

          <section className="modal-card-body">
          <figure class="image is-48x48">

            {this.props.person && <img src={this.props.person.image} alt={this.props.person.name} />}
           </figure>

            { this.props.person && this.props.person.contact_details.map( contactInfo => <p> { contactInfo.value }</p>)}
            <ul>
          { this.props.speaker && this.props.speaker.office.position.map(position => <li> {position}</li>)}
          </ul>
          </section>

          <footer className="modal-card-foot">
            {/* <button className="button is-success" onClick={() => this.props.saveToList(this)}>Save to list</button> */}
            <button className="button" aria-label="close" onClick={() => this.props.closeModal()}>
              Close
            </button>
          </footer>
        </div>
      </div>)
  }

}
