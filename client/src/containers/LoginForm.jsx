import React, { Component } from 'react';
import CsrfToken from '../components/djangoCsrfToken.jsx';
import { Link, Redirect } from "react-router-dom";

class LoginForm extends Component {

    componentDidMount() {}

    componentWillMount() {
       // this.props.onDevice();
    }

    render() {
        var errorOnLogin = (this.props.errors.errorOnLogin) ? <div className="alert alert-danger" role="alert">There was an error logging into your account, please try again.</div> : '';
        var successfulLoginRedirect = (this.props.model.redirect) ? <div className="alert alert-success" role="alert">You have successfully logged in.  <Link to={"/"}>Start storing your stuff now!</Link></div> : '';
        if(this.props.errors.isNotConnected){
            return <Redirect to='/error' />;
        }
        
        return (
            <div className="container">
                
                <form onSubmit={this.props.onSubmit} className="module">

                {errorOnLogin}
                {successfulLoginRedirect}

                <p>This app stores your personal data, we require you to login.</p>
                <p>If you do not have a 3EE ID, <Link to={"/create-account"}>sign up now!</Link></p>
                <CsrfToken csrftoken={this.props.csrftoken}/>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            className="form-control"
                            name="username"
                            type="string"
                            value={this.props.model.username}
                            onChange={this.props.onChange} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            value={this.props.model.password}
                            onChange={this.props.onChange} />
                    </div>
                
                    <button type="submit" className="btn btn-water btn-block">Login</button>
                    <hr/>
                    <a>Can't log in?</a>
                </form>
            </div>
        );
    }
}

export default LoginForm;
