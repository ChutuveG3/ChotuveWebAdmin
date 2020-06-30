import React, { Component } from 'react';
import HomeNavBar from "../components/HomeNavBar";
import UsersInfo from "../components/UsersInfo";
import {DrawerMenuList} from "../components/DrawerMenuList";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {VideoInfo} from "../components/VideoInfo";


class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            component: 'users'
        }
    }
    toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ open: open });
    };
    changeComponent = (component) => (event) => {
        this.setState({ component: component})
    }
    render(){
        return(
            <div>
                <HomeNavBar menuAction={this.toggleDrawer}/>
                <div>
                    {this.state.component === 'users' ? <UsersInfo/> : <VideoInfo/>}
                </div>
                <SwipeableDrawer
                    className="drawer"
                    anchor={"left"}
                    open={this.state.open}
                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                >
                    <div align="left" style={{paddingTop: "10px", paddingLeft: "17px"}}>
                        <h3>Options</h3>
                    </div>
                    <DrawerMenuList toggleDrawer={this.toggleDrawer} navigate={this.changeComponent}/>
                </SwipeableDrawer>
            </div>
        )
    }
}
export default Home;
