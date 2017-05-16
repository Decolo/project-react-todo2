import React, {Component} from 'react';

class TodoInput extends Component{
    render(){
        return(<input onKeyPress={this.submit} type="text" defaultValue={this.props.content} className="input" placeholder="type here"/>)
    }//监听了按键事件，用value无效，改用defaultVaule
    submit(e){
        if(e.key === 'Enter'){
            console.log('回车')
        }
    } //监听了回车这个事件
}

export default TodoInput