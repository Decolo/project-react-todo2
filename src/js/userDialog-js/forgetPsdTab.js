import React, { Component } from 'react';
import {AvModule} from '../leanCloud';
import {deepCopyByJson} from '../deepCopyByJson';

class ForgetPasswordTab extends Component {
    constructor(props){
        super(props)
        this.state = {
            formData:{
                email:''
            }
        }
    }
    render(){
        return(
            <div className="forget-tab">
                <h3>Forgot Password?</h3>
                <p>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
                <p>For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.</p>
                <form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}> {/* 登录*/}
                    <div className="row">
                    <label><i className="iconfont icon-youjian"></i></label>
                    <input type="text" 
                        onChange={this.changeFormData.bind(this)}/>
                    </div>
                    <div className="row actions">
                    <button type="submit" onClick={this.resetPassword.bind(this)} value="signIn">Send E-mails</button>
                    <a href="#" className="back-signup" onClick={this.showSignUpTab.bind(this)} value="signUp">Back to Sign Up</a>
                    </div>
                </form>
            </div>)
    }
    resetPassword(e){
        e.preventDefault()
        if(!isEmail(this.state.formData.email)){
            alert('The email is invalid')
        }else{
            let success = function(){
                alert('The email will be send soon.Check you mailbox.')
            }
            let error = function(){
                alert("This email hasn't been used")
            }
            AvModule.sendPasswordResetEmail(this.state.formData.email, success,error) 
        }
    }
    changeFormData(e){
        let stateCopy = deepCopyByJson(this.state)
        stateCopy.formData.email = e.target.value
        this.setState(stateCopy)
    }
    showSignInTab(e){
        if(this.state.formData.email){
            this.props.onShowInTab.call(null,e)
        }else{
            alert('Confirm Email Address')
        }
        
    }
    showSignUpTab(e){
        this.props.onShowUpTab.call(null,e)
    }    
}
function isEmail(str){
    var reg = /\w+@[0-9a-z]{2,8}(\.\w+)+/g
    return reg.test(str)
}
export default ForgetPasswordTab;