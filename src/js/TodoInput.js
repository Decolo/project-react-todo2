import React from 'react';

function TodoInput(props){
    return(
    <div className="input-box">
        <input type="text" className="input"
            value={props.content} 
            onChange={props.onChange}
            onKeyPress={submit.bind(null,props)} />
    </div>
    )
}
function submit(props,e){
    if(e.key === 'Enter'){
        if(e.target.value === ''){
            alert('输入不能为空')
        }else{
            props.onSubmit(e) 
        }
    }
} //监听了回车这个事件
export default TodoInput;