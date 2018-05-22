import React, { Component } from 'react';
import CsrfToken from '../components/djangoCsrfToken.jsx';


class SignUpForm extends Component {
    render() {
       
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.props.onSubmit} className="module">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Sign up for an account</h3>
                            </div>
                            <div className="panel-body">
                                Keep all your items safe under a secure account that can be used
                                across any of your devices.  It's fast, secure, and free!
                            </div>
                        </div>

                        <CsrfToken csrftoken={this.props.csrftoken}/>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                className="form-control"
                                name="username"
                                type="string"
                                onChange={this.props.onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                className="form-control"
                                name="email"
                                type="email"
                                onChange={this.props.onChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className="form-control"
                                name="password"
                                type="password"
                                onChange={this.props.onChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-water btn-block">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpForm;
