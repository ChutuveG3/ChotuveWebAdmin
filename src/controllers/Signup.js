import React, {Component} from "react";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default class Signup extends Component {
    render() {
        return(
            <div>
                <NavBar/>
                <Layout component={<SignupForm/>}/>
            </div>
        )
    }
}