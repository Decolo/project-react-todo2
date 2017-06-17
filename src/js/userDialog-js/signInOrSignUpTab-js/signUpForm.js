import React from 'react';

 function SignUpForm(props) {
        return(<form className="sign-up" onSubmit={props.onSubmit}> 
                <div className="row">
                    <label htmlFor="mail"><i className="iconfont icon-youjian"></i></label>
                    <input type="text" id="mail" onChange={props.onChange.bind(this,'email')}/>
                </div>
                <div className="row">
                    <label htmlFor="username"><i className="iconfont icon-yonghu"></i></label>
                    <input type="text" id="username" onChange={props.onChange.bind(this,'username')}/>
                </div>
                <div className="row">
                    <label htmlFor="password"><i className="iconfont icon-suoding"></i></label>
                    <input type="password" id="password" onChange={props.onChange.bind(this,'password')}/>
                </div>
                <div className="row action">
                    <button type="submit">Sign Up</button>
                </div>
            </form>)
}
export default SignUpForm