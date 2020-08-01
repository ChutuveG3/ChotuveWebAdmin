import {Link} from "react-router-dom";
import ChotuveLogoTransparent from "../ChotuveAdminSmall.png";
import React, {Component} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";

export default class NavBar extends Component {
    render() {
        return (
            <AppBar position="static" color='#FFFFFF'>
                <Toolbar variant="dense">
                    <img src={ChotuveLogoTransparent} alt={''}/>
                    <IconButton style={{marginLeft: "auto", fontSize: "medium"}}>
                        <Link to={"/sign-in"}>Login</Link>
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}





