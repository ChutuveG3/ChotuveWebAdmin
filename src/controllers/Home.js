import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";

class Home extends Component{
render(){
    return(
        <div>
            <NavBar/>
            <Layout component={<h2>Welcome to Chotuve Admin!..</h2>}/>
        </div>
    )
 }
}
export default Home;