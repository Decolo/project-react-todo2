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
      newToDo: 'test',
      todoList:[
        {id:1, title:'firstItem'},
        {id:2, title:'secondItem'}
      ]
    }
  }
  render() {

    let todos = this.state.todoList.map((item,index)=>{
      return (
        <li>
          <TodoItem todo={item}/>
        </li>
      )
    })
    console.log(todos)

    return (
      <div className="App">
        <h1 className="titile">My schedule</h1>
        <TodoInput content={this.state.newToDo}/>
        <ul className="todos-item">{todos}</ul>
      </div>
    );
  }
}

export default App;
