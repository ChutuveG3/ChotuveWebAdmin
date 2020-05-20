import React, {Component} from "react";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

export default class Login extends Component {
    render() {
        return(
            <div>
                <NavBar/>
                <Layout component={<LoginForm/>}/>
            </div>
        )
    }
}