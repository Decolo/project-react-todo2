import React, { Component } from 'react';

class navSignInOrUp extends Component {
    render(){
        return(
            <nav onChange={this.switch.bind(this)}>
                <label htmlFor="signUp" data={this.props.selectState==='signUp'}>
                <input type='radio' id="signUp" defaultChecked={this.props.selectState==='signUp'} 
                value="signUp"/><span>Need an account</span> Sign Up</label>
                <label htmlFor="signIn" data={this.props.selectState==='signIn'}>
                <input type='radio' id="signIn" defaultChecked={this.props.selectState==='signIn'} 
                value="signIn"/><span>Already have an account?</span> Sign In</label>
            </nav>
        )
    }
    switch(e){
        this.props.onSwitch.call(null,e)
    }
}
export default navSignInOrUp;