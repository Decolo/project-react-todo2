import React, {Component} from 'react';
import './UserDialog.css';
import {signUpRemote,signInRemote,sendPasswordResetEmail} from './leanCloud';

class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signUp',
            selectedTab: 'signInOrSignUp',
            formData:{
                username: '',
                password: '',
                email:''
            }
        }
    }
    switch(e){
        this.setState({
            selected: e.target.value
        })
    }
    showForgetPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    signIn(e){
        e.preventDefault()
        let username = this.state.formData.username
        let password = this.state.formData.password
        let success = (user)=>{
            this.props.onSignIn.call(null, user)  //传入一个user
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
        signInRemote(username, password, success, error) //import {signUpRemote,signInRemote} from './leanCloud'
    }
    signUp(e){
        e.preventDefault()
        let {username,password,email} = this.state.formData
        console.log(username)
        let success = (user)=>{
            this.props.onSignUp.call(null, user) //传入一个user
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
        signUpRemote(username, password,email,success, error) //import {signUpRemote,signInRemote} from './leanCloud'
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state)) //用JSON完成深拷贝
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email) 
    }
    returnSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selected = 'signIn'
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    render(){
         let signInForm = (<form className="sign-in" onSubmit={this.signIn.bind(this)}>
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
                                <a href="#" onClick={this.showForgetPassword.bind(this)} className="forget-password">Forget password</a>
                            </form>);
        let signUpForm =(<form className="sign-up" onSubmit={this.signUp.bind(this)}> 
                                <div className="row">
                                    <label htmlFor="mail"><i className="iconfont icon-youjian"></i></label>
                                    <input type="text" id="mail" onChange={this.changeFormData.bind(this,'email')}/>
                                </div>
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
                            </form>)
        let signInOrSignUpTab = (
            <div className="sign-tab">
                <h1>Weclcome to TodoList</h1>
                {this.state.selected === 'signUp' ? signUpForm : null}
                {this.state.selected === 'signIn' ? signInForm : null}
                <nav onChange={this.switch.bind(this)}>
                    <label htmlFor="signUp" data={this.state.selected==='signUp'}>
                    <input type='radio' id="signUp" defaultChecked={this.state.selected==='signUp'} 
                    value="signUp"/><span>Need an account</span> Sign Up</label>
                    <label htmlFor="signIn" data={this.state.selected==='signIn'}>
                    <input type='radio' id="signIn" defaultChecked={this.state.selected==='signIn'} 
                    value="signIn"/><span>Already have an account?</span> Sign In</label>
                </nav>
            </div>
        )
        let forgetPasswordTab = (
            <div className="forget-tab">
                <h3>Forgot Password?</h3>
                <p>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
                <p>For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.</p>
                <form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}> {/* 登录*/}
                    <div className="row">
                    <label><i className="iconfont icon-youjian"></i></label>
                    <input type="text" 
                        onChange={this.changeFormData.bind(this, 'email')}/>
                    </div>
                    <div className="row actions">
                    <button type="submit" onClick={this.returnSignIn.bind(this)}>Send E-mails</button>
                    </div>
                </form>
            </div>
        )
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
                        {this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUpTab : forgetPasswordTab}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDialog