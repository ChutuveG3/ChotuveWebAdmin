import ChotuveLogoTransparent from "../ChotuveAdminSmall.png";
import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton"
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

class LoggedNavBar extends Component {

    logout = () => () => {
        localStorage.removeItem('token')
        this.props.history.push('/')
    }
    render() {
        return (
            <AppBar position="static" color='#FFFFFF'>
                <Toolbar variant="dense">
                    <IconButton edge="start" onClick={this.props.menuAction(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <img src={ChotuveLogoTransparent} alt={''}/>
                    <IconButton style={{fontSize: "medium", marginLeft: "auto"}} edge="start"  onClick={this.logout()}>Log Out</IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(LoggedNavBar)
