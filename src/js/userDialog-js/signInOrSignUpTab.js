import React, { Component } from 'react';
import SignInForm from './signInOrSignUpTab-js/signInForm';
import SignUpForm from './signInOrSignUpTab-js/signUpForm';
import NavSignInOrUp from './signInOrSignUpTab-js/navSignInOrUp';
import {AvModule} from '../leanCloud';
import {deepCopyByJson} from '../deepCopyByJson';

export default class SignInOrSignUpTab extends Component {
    constructor(props){
        super(props)
        this.state={
            selected:'signIn',
            formData:{
                username: '',
                password: '',
                email:''
            }
        }
    }
    /*---------SignInForm、SignUpForm组件的操作---------*/
    changeFormData(key,e){
        let stateCopy = deepCopyByJson(this.state)
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    /*---------SignInForm组件的操作---------*/
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
        if(!isValidUsername(username)){
            alert('The username is invalid')
        }else if (!isVaildPassword(password)){
            alert('The password is invalid')
        }else{
            AvModule.signInRemote(username, password, success, error) //from leanCloud.js
        }
    }
    showForgetPasswordTab(){
        this.props.onShowForgetTab.call(null)
    }
    /*---------SignUpForm组件的操作---------*/
    signUp(e){
        e.preventDefault()
        let username = this.state.formData.username
        let password = this.state.formData.password
        let email = this.state.formData.email
        let success = (user)=>{
            this.props.onSignUp.call(null, user) //传入一个user
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
                    alert('This usrname has been used')
                break
            default:
                alert(error)
                break
            }
        }
        if(!isEmail(email)){
            alert('The email is invalid')
        } else if (!isValidUsername(username)){
            alert("The username's length should be more than 3 and less than 20")
        } else if (!isVaildPassword(password)){
            alert("The password's length should be more than 6")
        } else{
            AvModule.signUpRemote(username, password,email,success, error) //from leanCloud.js
        }  
    }
    /*---------NavSignInOrUp组件的操作---------*/
    switch(e){
        this.setState({
            selected: e.target.value
        })
    }
    
    render(){
        return(
            <div className="sign-tab">
                <h1>Weclcome to TodoList</h1>
                {/*---------SignUpForm组件---------*/}
                {this.state.selected === 'signUp' ? <SignUpForm 
                onChange={this.changeFormData.bind(this)} 
                onSubmit={this.signUp.bind(this)}/> : null} 
                {/*---------SignUpForm组件---------*/}
                {/*---------SignInForm组件---------*/}
                {this.state.selected === 'signIn' ? <SignInForm 
                onChange={this.changeFormData.bind(this)} 
                onSubmit={this.signIn.bind(this)} 
                onShowForgetTab={this.showForgetPasswordTab.bind(this)}/> : null}
                {/*---------SignInForm组件---------*/}
                {/*---------NavSignInOrUp组件---------*/}
                <NavSignInOrUp onSwitch={this.switch.bind(this)} selectState={this.state.selected}/>
                {/*---------NavSignInOrUp组件---------*/}
            </div>
        )
    }
}


function isEmail(str){
    var reg = /\w+@[0-9a-z]{2,8}(\.\w+)+/g
    return reg.test(str)
}
function isValidUsername(str){
    var reg = /^\w{3,20}$/
    return reg.test(str)
}
function isVaildPassword(str){
    var reg = /^\w{6,20}$/   
    return reg.test(str)
}