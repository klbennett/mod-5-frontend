import React, { Component } from 'react'

export default class PoliticianDetailModal extends Component {
  render() {
    return (
      <div>
        <div className="modal">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{ this.props.name } </p>
              <button className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
            <img src={this.props.image} alt={this.props.name}/>
              
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Save</button>
              <button className="button">Cancel</button>
            </footer>
          </div>
        </div>
    </div>
    )
  }
}
