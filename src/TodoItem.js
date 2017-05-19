import React, { Component } from 'react';

export default class TodoItem extends Component {

    render() {
        return ( 
            <div >
                <input type = "checkbox" id={this.props.index}
                checked = { this.props.todo.status === "completed" }
                onChange = { this.toggle.bind(this) }/> 
                <label htmlFor={this.props.index} className = "item-content">
                  <span>{this.props.todo.itemContent}</span>
                </label>
                <a href = "#" onClick = { this.delete.bind(this) }
                className = "btn-delete"></a>
            </div>
            )
        }
        delete(e) {
            this.props.onDelete(e, this.props.todo)
        }
        toggle(e) {
            this.props.onToggle(e, this.props.todo)
        }
    }