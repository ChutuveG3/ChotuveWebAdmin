import React, { Component } from "react";
import {authApi} from "../api/axios";
import {withRouter} from 'react-router-dom'

const EMAIL_FORMAT = RegExp(
"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
)

class LoginForm extends Component {
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
    validateData = ({ email, password, Error }) => {
        if (!EMAIL_FORMAT.test(email)){
            Error.email = 'Email address is invalid'
            console.log(email)
            return false
        }
        return authApi.post('/admins/sessions',{email: email,
                                    password: password})
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                return true
            })
            .catch(error => {
                console.log(error)
                Error.email = "Email and password don't match"
                return false
            })
    }
    onSubmit = async e => {
        e.preventDefault();
        e.persist()
        const valid = await this.validateData({...this.state})
        if (valid === true){
            console.log('Login')
            this.props.history.push('/')
        }
        else{
            console.log('Fail')
            this.setState({
            [e.target.Error]: e.target.value,
        })
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
export default withRouter(LoginForm)
