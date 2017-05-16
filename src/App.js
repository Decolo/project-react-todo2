import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput.js'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newToDo: 'test',
      todoList:[
        {id:1, titile:'firstItem'}
      ]
    }
  }
  render() {
    let todos = this.state.todoList.map((item,index)=>{
      return <li>{item.title}</li>
    })
    console.log(todos)

    return (
      <div className="App">
        <h1 className="titile">My schedule</h1>
        <TodoInput content={this.state.newToDo}/>
        <ul className="todo-item">{todos}</ul>
      </div>
    );
  }
}

export default App;
