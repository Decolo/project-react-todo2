import React, { Component } from 'react';

export default class TodoItem extends Component {
    constructor(props){
        super(props)
        console.log(this)
    }
    render() {
        return ( 
            <div >
                <input type="checkbox" id={this.props.index}
                checked={ this.props.todo.status === "completed" }
                onChange={ this.toggle.bind(this) }/> 
                <label htmlFor={this.props.index} className="item-content">
                  <span>{this.props.todo.itemContent}</span>
                </label>
                <a href="#" onClick={ this.delete.bind(this) }
                className="btn-delete"></a>
            </div>
            )
        }  
        delete(e) {
            console.log(e.target)
            this.props.onDelete(e, this.props.todo)
        }
        toggle(e) {
            this.props.onToggle(e, this.props.todo)
        }
    }