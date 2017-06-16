import React, { Component } from 'react';

class SignUpForm extends Component {
    render() {
        return(<form className="sign-up" onSubmit={this.signUp.bind(this)}> 
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
    }
    changeFormData(key,e){
        this.props.onChange.call(null,key,e)
    }
    signUp(e){
        this.props.onSubmit.call(null,e)
    }
}
export default SignUpForm