import React, { Component } from 'react';

export default class TodoItem extends Component {
    render() {
        return (
            <div>
                <input type = "checkbox" checked={this.props.todo.status === "completed"}
                onChange={this.toggle.bind(this)}/>
                <p className="item-content">{this.props.todo.itemContent}</p>
                <a href="#" onClick={this.delete.bind(this)} className="btn-delete">x</a>
            </div>)
    }
    delete(e){
        this.props.onDelete(e,this.props.todo)
    }
    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
}