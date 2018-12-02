import React, { Component } from 'react'
import ReactQuill from "react-quill";
import { listService } from '../services';


export class Quill extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: '', body: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    onHandleSubmit(e) {
        e.preventDefault();
        const note = {
            body: this.state.body
        };
        this.setState({
            body: ''
        });
    }


    render() {
        return <div className="tile">
            <div className="form-group">
            <ReactQuill theme="snow" value={this.state.text} onChange={this.handleChange} />
          </div>
          </div>
    }
}