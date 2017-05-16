import React, { Component } from 'react';
import './App.css';


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
        <input className="input" type="text" placeholder="type here"/>
        <ul className="todo-item">{todos}</ul>
      </div>
    );
  }
}

export default App;
