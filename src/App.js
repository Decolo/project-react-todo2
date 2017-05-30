import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStore from './localStore';

import AV from 'leancloud-storage';

const APP_ID = 'a9LoGqiGaA46Gt1fXMitwYHT-gzGzoHsz';
const APP_KEY = 'W0JvqFX9sOXQovUeO59Vc3SS';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

/*----------测试代码----------*/
var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hi'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
/*----------测试代码----------*/


class App extends Component {
    constructor(props) {
        super(props)
        this.id = 0 //初始化第一个todoItem的id从一开始，先设为0
                    // this.state = localStore.load('state') || { newTodo: '', todoList: [] }
        this.state = {
              newTodo: '',
              todoList: localStore.load('todoList') || []  //todoList中有四个属性，分别是id、itemContent、status、deleted
                                                            // 数据结构 {
                                                            //             todoList:[
                                                            //               {id:..., itemContent:..., status:..., deleted:...},
                                                            //               {id:..., itemContent:..., status:..., deleted:...},
                                                            //               {id:..., itemContent:..., status:..., deleted:...}
                                                            //               {id:..., itemContent:..., status:..., deleted:...}
                                                            //             ]
                                                            //               newTodo:'';每次新添加一个todo，就要在input中清空已经输入的内容
                                                            //         }
            }
    }
    render() {
            let todos = this.state.todoList
                .filter((item) => { return !item.deleted })
                .map((item, index) =>
                    <li key = { index } >
                        <TodoItem todo = { item }
                        index = { 'item' + index }
                        onToggle = { this.toggle.bind(this) }
                        onDelete = { this.delete.bind(this) }
                        /> 
                    </li>
                )
                // console.log(todos)
                // console.log(this.state.newTodo)
            return ( 
                <div className = "App">
                    <h1 className = "title" > My schedule </h1> 
                    <TodoInput content = { this.state.newTodo }
                    onChange = { this.changeTitle.bind(this) }
                    onSubmit = { this.addTodo.bind(this) }/>  {/*见鬼了， 这一段拷贝来显示正常， 自己写的就只能一个一个的输入*/} 
                    <ul className = "todos-list">{todos}</ul>
                </div>
            )

        }
    componentDidUpdate(){
        // localStore.save('state',this.state) 
        localStore.save('todoList',this.state.todoList)
        // componentDidUpdate 会在组件更新之后调用。
        // 如果我们默认「组件更新」等价于「数据更新」，那么就可以把 localStore.save('todoList', this.state.todoList) 写在这个钩子里。
    }

    /*-------增-------*/
    addTodo(e) {
            // console.log(this) 新的方法，它的this需要通过bind重新绑定
            this.state.todoList.push({ //添加一个新的todo
                id: this.idMaker(),
                itemContent: e.target.value,
                status: null,
                deleted: false
            })
            this.setState({
                newTodo: '',
                todoList: this.state.todoList
            })
            // localStore.save('state', this.state) //储存此时的this。state
        }
    idMaker() {
        this.id++
        return this.id
    }
    /*------删--------*/
    delete(e, todo) {
            todo.deleted = true
            this.setState(this.state)
            // localStore.save('state', this.state) //储存此时的this。state
        }
    /*-------改-------*/
    changeTitle(e) {
            this.setState({
                newTodo: e.target.value,
                todoList: this.state.todoList
            })
            // localStore.save('state', this.state) //储存此时的this。state
        }
    /*-------查-------*/
    toggle(e, todo) {
        todo.status = todo.status === 'completed' ? '' : 'completed'
        this.setState(this.state) //触发一次重绘
        // localStore.save('state', this.state) //储存此时的this。state
    }
}

export default App;

//1.react一切的变化都依靠setState去实现，state作为一个对象，它记录了初始状态的需要的一些参数。
//2."增"添加一个todo的Item，监听todoInput，一旦点击的是enter键，执行addTodo方法，在this.state.todoList中添加一个新的对象。再将this.state
//  这个对象交给this.setState这个方法去执行，触发重绘。新增加的todoItem就会被渲染到页面上。
//3."删"删除一个todo的Item，监听删除的按钮，点击删除按钮，执行delete方法，那么将它对应的在this.state.todoList中
//  的对象中的deleted属性改变。再将this.state这个对象交给this.setState这个方法去执行，触发重绘。在重绘过程中重新执行App的render()，
//  把对象中deleted属性为true的都排除，只留下deleted属性不为true的进行渲染。
//4."改"改变todoInput中输入的值，那么要监听todoInput,一旦有新的输入，触发changeTitle方法，直接给this.setState传入一个对象，newTodo的值为
//  todoInput输入的内容，执行this.setState触发重绘，TodoInput中的Input标签的value就是newTodo的值。
//5.某项todo完成，那么监听todoItem,点击就执行toggle标记该代办项已经完成。每点击一个todItem，那么将它对应的在this.state.todoList中
//  的对象中的status属性改变。再将this.state这个对象交给this.setState这个方法去执行，触发重绘。其中每一个todoList中包含的那个checkbox
//  checked属性会发生变化。