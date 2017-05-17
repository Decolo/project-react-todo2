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
      newToDo: '',
      todoList:[
      ]
    }
  }
  render() {
    let todos = this.state.todoList.map((item,index)=>
        <li key={index}><TodoItem todo={item}/></li>
    )
    // console.log(todos)
    // console.log(this)  render方法的this自动是App
    return (
      <div className="App">
        <h1 className="titile">My schedule</h1>
        <TodoInput content={this.state.newToDo} onSubmit={this.addTodo.bind(this)}/>
        <ul className="todos-item">{todos}</ul>
      </div>
    );
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
    console.log(this.state.todoList)
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
}

export default App;
