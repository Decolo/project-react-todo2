import React, {Component} from 'react';
import './TodoInput.css';
class TodoInput extends Component{
    constructor(props){
        super(props)
        console.log(this)
    }
    render(){
        return(
        <div className="input-box">
            <input type="text" className="input"
                value={this.props.content} 
                onChange={this.changeTitle.bind(this)}
                onKeyPress={this.submit.bind(this)} />
        </div>
        )
    }//监听了按键事件，用value无效，改用defaultValue
    submit(e){
        if(e.key === 'Enter'){
           if(e.target.value === ''){
               alert('输入不能为空')
           }else{
                this.props.onSubmit(e) 
           }
        }
    } //监听了回车这个事件
    changeTitle(e){
        this.props.onChange(e)
    }
}

export default TodoInput;