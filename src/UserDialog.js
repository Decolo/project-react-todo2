import React, {Component} from 'react';
import './UserDialog.css'

class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signUp'
        }
    }
    switch(e){
        this.setState({
            selected: e.target.value
        })
    }

    render(){
        console.log(this.state)
        return(
            <div className="user-dialog-wrapper">
                <div className="user-dialog">
                    <div className="bubble">
                        <div className = "wrapper">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="bubble">
                        <div className = "wrapper">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="login-pic">
                    </div>
                    <div className="content">
                        <div className = "panes">
                            <nav onChange={this.switch.bind(this)}>
                                <label htmlFor="signUp" value={this.state.selected==='signUp'}><input type='radio' id="signUp" 
                                checked={this.state.selected==='signUp'} value="signUp"/>Sign Up</label>
                                <label htmlFor="signIn" value={this.state.selected==='signIn'}><input type='radio' id="signIn" 
                                checked={this.state.selected==='signIn'} value="signIn"/>Sign In</label>
                            </nav>
                            <form className="sign-up" value={this.state.selected==='signUp'}>
                                <div className="row">
                                    <label htmlFor="username"><i className="iconfont icon-yonghuming"></i></label>
                                    <input type="text" id="username"/>
                                </div>
                                <div className="row">
                                    <label htmlFor="password"><i className="iconfont icon-unie614"></i></label>
                                    <input type="password" id="password"/>
                                </div>
                                <div className="row action">
                                    <button type="submit">Sign Up</button>
                                </div>
                            </form>
                            <form className="sign-in" value={this.state.selected==='signIn'}>
                                <div className = "row">
                                    <label htmlFor="username"><i className="iconfont icon-yonghuming"></i></label>
                                    <input type="text" id="username"/>
                                </div>
                                <div className = "row">
                                    <label htmlFor="password"><i className="iconfont icon-unie614"></i></label>
                                    <input type="password" id="password"/>
                                </div>
                                <div className = "row action">
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