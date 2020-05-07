import React, { Component } from "react";

const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

const validateData = ({ email, password, Error }) => {
    let valid = true
    if (!regExp.test(email)){
        valid = false
        Error.email = 'Email address is invalid'
    }
    if (email.length === 0){
        valid = false
        Error.email = 'Email address is required'
    }
    if (password.length === 0){
        valid = false
        Error.password = 'Password is required'
    }
    return valid
}

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            Error: {
                email: '',
                password: ''
            }
        }
    }
    onSubmit = e => {
        e.preventDefault();
        if (validateData({...this.state})){
            console.log('Login')
        }
        else{
            console.log('Fail')
        }

    };

    formValChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        const { email, password, Error } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className={Error.email.length > 0 ? "is-invalid form-control" : "form-control"}
                        name = 'email'
                        value={email}
                        placeholder="Enter email"
                        onChange={this.formValChange}
                        required
                    />
                    {Error.email.length > 0 && (
                        <span className="invalid-feedback">{Error.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name='password'
                        value={password}
                        placeholder="Enter password"
                        onChange={this.formValChange}
                        required
                    />
                    {Error.password.length > 0 && (
                        <span className="invalid-feedback">{Error.password}</span>
                    )}
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot password?
                </p>
            </form>
        );
    }
}