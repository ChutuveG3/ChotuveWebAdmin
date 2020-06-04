import React, { Component } from 'react';
import HomeNavBar from "../components/HomeNavBar";
import UsersInfo from "../components/UsersInfo";

class Home extends Component{
render(){
    return(
        <div>
            <HomeNavBar/>
            <div>
                <UsersInfo/>
            </div>
        </div>
    )
 }
}
export default Home;
