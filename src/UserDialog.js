import React, {Component} from 'react';
import './UserDialog.css';
import {signUpRemote,signInRemote} from './leanCloud';

class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signUp',
            formData:{
                username: '',
                password: '',
            }
        }
    }
    switch(e){
        this.setState({
            selected: e.target.value
        })
    }
    signIn(e){
        e.preventDefault()
        let {username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignIn.call(null, user)
        }
        let error = (error)=>{
            switch(error.code){
                case 210:
                    alert('用户名与密码不匹配')
                break
            default:
                alert(error)
                break
            }
        }
        console.log('signIn')
        signInRemote(username, password, success, error) //import {signUpRemote,signInRemote} from './leanCloud'
    }
    signUp(e){
        console.log('signUp')
        e.preventDefault()
        let username = this.state.formData.username
        let password = this.state.formData.password
        let success = (user)=>{
            this.props.onSignUp.call(null, user)
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
                    alert('用户名已被占用')
                break
            default:
                alert(error)
                break
            }
        }
        signUpRemote(username, password, success, error) //import {signUpRemote,signInRemote} from './leanCloud'
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state)) //用JSON完成深拷贝
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render(){
        // console.log(this.state)
        return(
            <div className="user-dialog-wrapper">
                <div className="user-dialog">
                    <div className="bubble">
                        <div className="wrapper">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="bubble">
                        <div className="wrapper">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="login-pic">
                    </div>
                    <div className="content">
                        <div className="panes">
                            <nav onChange={this.switch.bind(this)}>
                                <label htmlFor="signUp" data={this.state.selected==='signUp'}>
                                <input type='radio' id="signUp" defaultChecked={this.state.selected==='signUp'} 
                                value="signUp"/>Sign Up</label>
                                <label htmlFor="signIn" data={this.state.selected==='signIn'}>
                                <input type='radio' id="signIn" defaultChecked={this.state.selected==='signIn'} 
                                value="signIn"/>Sign In</label>
                            </nav>
                            <form className="sign-up" data={this.state.selected==='signUp'} 
                            onSubmit={this.signUp.bind(this)}> 
                                <div className="row">
                                    <label htmlFor="username"><i className="iconfont icon-yonghu"></i></label>
                                    <input type="text" id="username" onChange={this.changeFormData.bind(this,'username')}/>
                                </div>
                                <div className="row">
                                    <label htmlFor="password"><i className="iconfont icon-suoding"></i></label>
                                    <input type="password" id="password" onChange={this.changeFormData.bind(this,'password')}/>
                                </div>
                                <div className="row action">
                                    <button type="submit">Sign Up</button>
                                </div>
                            </form>
                            <form className="sign-in" data={this.state.selected==='signIn'}
                            onSubmit={this.signIn.bind(this)}>
                                <div className="row">
                                    <label htmlFor="username"><i className="iconfont icon-yonghu"></i></label>
                                    <input type="text" id="username" onChange={this.changeFormData.bind(this,'username')}/>
                                </div>
                                <div className="row">
                                    <label htmlFor="password"><i className="iconfont icon-suoding"></i></label>
                                    <input type="password" id="password" onChange={this.changeFormData.bind(this,'password')}/>
                                </div>
                                <div className="row action">
                                    <button type="submit">Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDialog