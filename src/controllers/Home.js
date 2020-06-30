import React, { Component } from 'react';
import HomeNavBar from "../components/HomeNavBar";
import UsersInfo from "../components/UsersInfo";
import SwipeableTemporaryDrawer from "../components/Drawer";

class Home extends Component{
render(){
    return(
        <div>
            <HomeNavBar/>
            <div>
                <UsersInfo/>
            </div>
            <SwipeableTemporaryDrawer/>
        </div>
    )
 }
}
export default Home;
