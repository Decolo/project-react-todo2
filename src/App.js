import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList:[
      ]
    }
  }
  render() {
    let todos = this.state.todoList
    .filter((item)=>{return !item.deleted})
    .map((item,index)=>
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)}
          onDelete={this.delete.bind(this)}/>
        </li>
    )
    // console.log(todos)
    // console.log(this)  render方法的this自动是App
    return (
      <div className="App">
        <h1 className="titile">My schedule</h1>
        <TodoInput content={this.state.newTodo} 
          onChange={this.changeTitle.bind(this)}
          onSubmit={this.addTodo.bind(this)}
           />  {/*见鬼了，这一段拷贝来显示正常，自己写的就只能一个一个的输入*/}
        <ul className="todos-item">{todos}</ul>
      </div>
    );
    
  }
  toggle(e,todo){
    todo.status =  todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state) //触发一次重绘
  }
  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(e){
    // console.log(this) 新的方法，它的this需要通过bind重新绑定
    // console.log(this.state.todoList)
    this.state.todoList.push({
      id:(function(){
        let i = 0;
        i++;
        return i;
      })(),
      title: e.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  delete(e,todo){
    todo.deleted = true
    this.setState(this.state)
  }
  
}

export default App;
