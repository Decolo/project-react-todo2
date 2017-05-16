import React, {Component} from 'react';

class TodoInput extends Component{
    render(){
        return(<input type="text" value={this.props.content} className="input" placeholder="type here"/>)
    }
}

export default TodoInput