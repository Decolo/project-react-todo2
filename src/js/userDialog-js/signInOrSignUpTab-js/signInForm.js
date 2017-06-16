import React, { Component } from 'react';

class SignInForm extends Component {
    render() {
        return (<form className="sign-in" onSubmit={this.signIn.bind(this)}>
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
                </form>)}
    changeFormData(key,e){
        this.props.onChange.call(null,key,e)
    }
    signIn(e){
        this.props.onSubmit.call(null,e)
    }
    showForgetPassword(){
        this.props.onShowForgetTab.call(null)
    }
}
export default SignInForm