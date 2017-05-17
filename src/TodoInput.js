import React, {Component} from 'react';

class TodoInput extends Component{
    render(){
        return(<input onKeyPress={this.submit.bind(this)} 
            type="text" value={this.props.content} 
            onChange={this.changeTitle.bind(this)}
            className="input" placeholder="type here"/>)
    }//监听了按键事件，用value无效，改用defaultVaule
    submit(e){
        if(e.key === 'Enter'){
           this.props.onSubmit(e) 
        }
    } //监听了回车这个事件
    changeTitle(e){
        this.props.onChange(e)
    }
}

export default TodoInput