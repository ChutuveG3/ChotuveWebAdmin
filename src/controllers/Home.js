import React, { Component } from 'react';
import HomeNavBar from "../components/HomeNavBar";
import Users from "../components/Table";

class Home extends Component{
render(){
    return(
        <div>
            <HomeNavBar/>
            <div className="users-list">
                <Users/>
            </div>
        </div>
    )
 }
}
export default Home;
