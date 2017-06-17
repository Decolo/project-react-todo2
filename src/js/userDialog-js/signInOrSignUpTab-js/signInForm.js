import React from 'react';
function  SignInForm(props){
        return (<form className="sign-in" onSubmit={props.onSubmit}>
                    <div className="row">
                        <label htmlFor="username"><i className="iconfont icon-yonghu"></i></label>
                        <input type="text" id="username" onChange={props.onChange.bind(this,'username')}/>
                    </div>
                    <div className="row">
                        <label htmlFor="password"><i className="iconfont icon-suoding"></i></label>
                        <input type="password" id="password" onChange={props.onChange.bind(this,'password')}/>
                    </div>
                    <div className="row action">
                        <button type="submit">Sign In</button>
                    </div>
                    <a href="#" onClick={props.onShowForgetTab} className="forget-password">Forget password</a>
                </form>)
}
export default SignInForm