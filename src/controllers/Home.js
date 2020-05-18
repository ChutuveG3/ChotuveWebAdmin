import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import HomeNavBar from "../components/HomeNavBar";

class Home extends Component{
render(){
    return(
        <div>
            <HomeNavBar/>
            <Layout component={<h2>Welcome to Chotuve Admin!..</h2>}/>
        </div>
    )
 }
}
export default Home;