import React, {Component} from 'react';
import './UserDialog.css';
import {signUpRemote,signInRemote,sendPasswordResetEmail} from './leanCloud';
import {deepCopyByJson} from './deepCopyByJson';
import SignUpForm from './signUpForm';  //SignUpForm组件
import SignInForm from './signInForm';  //SignInForm组件
import NavSignInOrUp from './navSignInOrUp' //navSignInOrUp插件


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
        let stateCopy = deepCopyByJson(this.state)
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    showSignUpTab(){
        let stateCopy = deepCopyByJson(this.state)
        stateCopy.selected = 'signUp'
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    showSignInTab(e){
        if(this.state.formData.email){
            let stateCopy = deepCopyByJson(this.state)
            stateCopy.selected = 'signIn'
            stateCopy.selectedTab = 'signInOrSignUp'
            this.setState(stateCopy)
        }else{
            alert('Confirm Email Address')
        }
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
                    alert('The username and password do not match')
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
        let stateCopy = deepCopyByJson(this.state)
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email) 
    }
    
    render(){        
        let signInOrSignUpTab = (
            <div className="sign-tab">
                <h1>Weclcome to TodoList</h1>
                {/*---------SignUpForm组件---------*/}
                {this.state.selected === 'signUp' ? <SignUpForm onChange={this.changeFormData.bind(this)} 
                onSubmit={this.signUp.bind(this)}/> : null} 
                {/*---------SignUpForm组件---------*/}
                {/*---------SignInForm组件---------*/}
                {this.state.selected === 'signIn' ? <SignInForm onChange={this.changeFormData.bind(this)} 
                onSubmit={this.signIn.bind(this)} onShowForgetTab={this.showForgetPassword.bind(this)}/> : null}
                {/*---------SignInForm组件---------*/}
                {/*---------NavSignInOrUp组件---------*/}
                <NavSignInOrUp onSwitch={this.switch.bind(this)} selectState={this.state.selected}/>
                {/*---------NavSignInOrUp组件---------*/}
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
                    <button type="submit" onClick={this.showSignInTab.bind(this)}>Send E-mails</button>
                    <a href="#" className="back-signup" onClick={this.showSignUpTab.bind(this)}>Back to Sign Up</a>
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