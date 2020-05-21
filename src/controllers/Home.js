import React, { Component } from 'react';
import Layout from "../components/Layout";
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
