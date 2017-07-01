import React, {Component} from 'react';
import {deepCopyByJson} from './deepCopyByJson';
import SignInOrSignUpTab from './userDialog-js/signInOrSignUpTab'; //SignInOrSignUpTab组件
import ForgetPasswordTab from './userDialog-js/forgetPsdTab'; //ForgetPasswordTab组件


class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedTab: 'signInOrSignUp',
        }
    }
    
    showForgetPasswordTab(){
        let stateCopy = deepCopyByJson(this.state)
        stateCopy.selectedTab = 'forgetPassword'
        this.setState(stateCopy)
    }
    showSignUpTab(e){
        e.preventDefault()
        let stateCopy = deepCopyByJson(this.state)
        // stateCopy.selected = 'signUp'
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    showSignInTab(e){
        e.preventDefault()
        let stateCopy = deepCopyByJson(this.state)
        // stateCopy.selected = 'signIn'
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    render(){   
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
                        {this.state.selectedTab === 'signInOrSignUp' ? 
                        <SignInOrSignUpTab 
                        onSignIn={this.props.onSignIn}
                        onSignUp={this.props.onSignUp}
                        onShowForgetTab={this.showForgetPasswordTab.bind(this)}
                        /> : null}
                        {this.state.selectedTab === 'forgetPassword' ?
                        <ForgetPasswordTab 
                        onShowInTab={this.showSignInTab.bind(this)}
                        onShowUpTab={this.showSignUpTab.bind(this)}
                        /> : null}
                        {/*-----ForgetPasswordTab组件-------*/} 
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDialog