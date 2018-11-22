import React, { Component } from 'react'

export default class FullTextModal extends Component {
    
    render() {

    return (
        <div className={this.props.showModal === true ? "modal is-active" : "modal"}>
            <section className="modal-main">
               <h1>hi</h1>
                <button onClick={this.props.handleClose}>close</button>
            </section>
        </div>
    );
    }

}
    