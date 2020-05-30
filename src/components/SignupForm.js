import React, { Component } from "react";
import axios from 'axios';
import {getSetting} from "../settings";
import {withRouter} from 'react-router-dom'

const validateData = ({firstName, lastName, email, passwordFirst, passwordSecond, Error}) => {

    if (passwordFirst.length < 6){
        Error.passwordFirst = 'Password must be at least 6 characters'
        return false
    }
    if (passwordFirst !== passwordSecond) {
        Error.passwordSecond = 'Passwords must match'
        return false
    }
    const options = {headers: {crossOrigin : true, withCredentials: false}}
    const url = getSetting('AUTH_BASE_URL') + '/admins'
    console.log(url)
    return axios.post(url,{first_name: firstName,
                                last_name: lastName,
                                email: email,
                                password: passwordFirst}, options)
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            return true
        })
        .catch(error => {
            console.log(error.response.data)
            Error.email = 'An admin with that email already exists'
            return false
        })

}

class SignupForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            passwordFirst: '',
            passwordSecond: '',
            Error: {
                firstName: '',
                lastName: '',
                email: '',
                passwordFirst: '',
                passwordSecond: ''
            }
        }
    }
    onSubmit = async e => {
        e.preventDefault();
        e.persist()
        const valid = await validateData({...this.state})
        if (valid === true) {
            console.log('Success')
            this.props.history.push('/')
        }
        else{
            this.setState({
            [e.target.Error]: e.target.value,
        })
        }

    };

    formValChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    render() {
        const { firstName, lastName, email, passwordFirst, passwordSecond, Error } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input
                        type="text"
                        className= {Error.firstName.length > 0 ? "is-invalid form-control" : "form-control"}
                        placeholder="First name"
                        name='firstName'
                        value={firstName}
                        onChange={this.formValChange}
                        required
                    />
                    {Error.firstName.length > 0 && (
                        <span className="invalid-feedback">{Error.firstName}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input
                        type="text"
                        className= {Error.firstName.length > 0 ? "is-invalid form-control" : "form-control"}
                        placeholder="Last name"
                        name='lastName'
                        value={lastName}
                        onChange={this.formValChange}
                        required
                    />
                    {Error.lastName.length > 0 && (
                        <span className="invalid-feedback">{Error.lastName}</span>
                    )}
                </div>

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
                        className={Error.passwordFirst.length > 0 ? "is-invalid form-control" : "form-control"}
                        name='passwordFirst'
                        value={passwordFirst}
                        placeholder="Enter password"
                        onChange={this.formValChange}
                        required
                    />
                    {Error.passwordFirst.length > 0 && (
                        <span className="invalid-feedback">{Error.passwordFirst}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Re-enter password</label>
                    <input
                        type="password"
                        className={Error.passwordSecond.length > 0 ? "is-invalid form-control" : "form-control"}
                        name='passwordSecond'
                        value={passwordSecond}
                        placeholder="Re-enter password"
                        onChange={this.formValChange}
                        required
                    />
                    {Error.passwordSecond.length > 0 && (
                        <span className="invalid-feedback">{Error.passwordSecond}</span>
                    )}
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
        );
    }
}
export default withRouter(SignupForm)