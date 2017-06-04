import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser} from './leanCloud';
import {signOutRemote} from './leanCloud';


/*----------测试代码----------*/
// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hi'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })
/*----------测试代码----------*/


class App extends Component {
    constructor(props) {
        super(props)
        this.itemId = 0                                     //初始化第一个todoItem的id从一开始，先设为0
                                                            // this.state = localStore.load('state') || { newTodo: '', todoList: [] }
        this.state = {
              user: getCurrentUser() || {},                 //getCurrentUser()返回getUserFromAVUser(user)或者是null
              newTodo: '',
              todoList:[],                                  //todoList中有四个属性，分别是id、itemContent、status、deleted
              isInputShowed: false                          // 数据结构 {
                                                            //             todoList:[
                                                            //               {itemId:..., itemContent:..., status:..., deleted:...},
                                                            //               {itemId:..., itemContent:..., status:..., deleted:...},
                                                            //               {itemId:..., itemContent:..., status:..., deleted:...}
                                                            //               {itemId:..., itemContent:..., status:..., deleted:...}
                                                            //             ]
                                                            //               newTodo:'';每次新添加一个todo，就要在input中清空已经输入的内容
                                                            //         }
            }
    }
    render() {
            let todos = this.state.todoList
                .filter((item) => { return !item.deleted })
                .map((item, index) =>
                    <li key={ index } >
                        <h4 className='date'>{dateString()}</h4>
                        <TodoItem todo={item}
                        index={ 'item' + index }
                        onToggle={ this.toggle.bind(this) }
                        onDelete={ this.delete.bind(this) }
                        onEdite={this.edite.bind(this)}
                        /> 
                    </li>
                )
                // console.log(todos)
                // console.log(this.state.newTodo)
            return ( 
                <div className="App">
                    <div className="first-row">
                        <span className="title" > ToDoList</span>
                        {this.state.user.id ? <a href="#" className="sign-out" onClick={this.signOut.bind(this)}><i className="iconfont icon-dengchu"></i></a> : null} 
                    </div>
                    <div className="input-todo">
                        {!this.state.isInputShowed ? <a href="#" onClick={this.showTodoInput.bind(this)}>Add</a> : null}
                        {this.state.isInputShowed ? <a href="#" onClick={this.showTodoInput.bind(this)}>Close</a> : null}
                        {this.state.isInputShowed ? <TodoInput content={ this.state.newTodo }
                        onChange={ this.changeTitle.bind(this) }
                        onSubmit={ this.addTodo.bind(this) }/> : null} {/*见鬼了， 这一段拷贝来显示正常， 自己写的就只能一个一个的输入*/} 
                    </div>
                    <ul className="todos-list">{todos}</ul>
                    <div className="last-row">
                        <div className="todo">todo</div>
                        <div className="done">done</div>
                    </div>
                    {this.state.user.id ? null : <UserDialog onSignUp={this.signUpOrSignIn.bind(this)}
                    onSignIn={this.signUpOrSignIn.bind(this)}/>}{/*有id了代表注册成功，返回第二个表达式关闭Userdialog；否则返回第三个表达式显示Userdialog*/}
                </div>
            )

        }
    componentDidUpdate(){
        // localStore.save('state',this.state) 
        // localStore.save('todoList',this.state.todoList)
        // componentDidUpdate 会在组件更新之后调用。
        // 如果我们默认「组件更新」等价于「数据更新」，那么就可以把 localStore.save('todoList', this.state.todoList) 写在这个钩子里。
    }

    showTodoInput(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.isInputShowed = !stateCopy.isInputShowed
        this.setState(stateCopy)
    }
    /*-------增-------*/
    addTodo(e) {
            // console.log(this) 新的方法，它的this需要通过bind重新绑定
            this.state.todoList.push({ //添加一个新的todo
                itemId: this.idMaker(),
                itemContent: e.target.value,
                status: null,
                deleted: false,
            })
            this.setState({
                newTodo: '',
                todoList: this.state.todoList,
                isInputShowed: false  
            })
            // localStore.save('state', this.state) //储存此时的this。state
        }
    idMaker() {
        this.itemId++
        return this.itemId
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
    edite(e,todo){
        todo.itemContent = e.target.value
        this.setState(this.state)
    }
    /*-------查-------*/
    toggle(e, todo) {
        todo.status = todo.status === 'completed' ? '' : 'completed'
        this.setState(this.state) //触发一次重绘
        // localStore.save('state', this.state) //储存此时的this。state
    }
    /*-------注册与登入-------*/
    signUpOrSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state)) //深拷贝
        stateCopy.user = user  // user = {id:xx, ...xx}
        this.setState(stateCopy)
    }
    /*-------登出-------*/
    signOut(){
        signOutRemote()
        let stateCopy = JSON.parse(JSON.stringify(this.state)) //深拷贝
        stateCopy.user = {}
        this.setState(stateCopy)
    }
}

export default App;

function dateString(){
    let dateNow = new Date()
    let dayArr = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    let monthArr = ['Jaunary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${dayArr[dateNow.getDay()]}  ${dateNow.getDate()}th  ${monthArr[dateNow.getMonth()]}`
}
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