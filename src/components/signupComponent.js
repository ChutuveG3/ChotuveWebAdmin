import React, { Component } from "react";
import SignupForm from "./SignupForm";

export default class SignUp extends Component {

    render() {
        return (
            <SignupForm {...this.props} onSignup = {this.props.onSignup} />
        );
    }
}