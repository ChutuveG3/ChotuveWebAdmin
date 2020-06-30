import React, { Component } from 'react';
import HomeNavBar from "../components/HomeNavBar";
import UsersInfo from "../components/UsersInfo";
import {DrawerMenuList} from "../components/DrawerMenuList";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import VideoInfo from "../components/VideoInfo";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from "@material-ui/core/Divider";
import {ServersInfo} from "../components/ServersInfo";
import Layout from "../components/Layout";


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
        let view = <UsersInfo/>
        switch (this.state.component){
            case 'users':
                view = <UsersInfo/>
                break
            case 'videos':
                view = <VideoInfo/>
                break
            case 'home':
                break
            case 'servers':
                view = <Layout component = {<ServersInfo/>}/>
                break
            default:
                view = <UsersInfo/>
                break
        }
        return(
            <div>
                <HomeNavBar menuAction={this.toggleDrawer}/>
                <div>
                    {view}
                </div>
                <SwipeableDrawer
                    className="drawer"
                    anchor={"left"}
                    open={this.state.open}
                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                >
                    <div style={{height: "50px", display : "flex", justifyContent: "flex-end"}}>
                        <IconButton onClick={this.toggleDrawer(false)}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <DrawerMenuList toggleDrawer={this.toggleDrawer} navigate={this.changeComponent}/>
                </SwipeableDrawer>
            </div>
        )
    }
}
export default Home;
