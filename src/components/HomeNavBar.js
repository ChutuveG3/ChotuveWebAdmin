import {Link} from "react-router-dom";
import ChotuveLogoTransparent from "../ChotuveAdminSmall.png";
import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton"

class HomeNavBar extends Component {

    logout = () => {
        localStorage.removeItem('token')
    }
    render() {
        return (
            <nav className="navbar navbar-expand-xl navbar-light fixed-top">
                <div className="container">
                    <IconButton onClick={this.props.menuAction(true)}>
                        <MenuIcon />
                    </IconButton>
                    <img src={ChotuveLogoTransparent} alt={''}/>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <Link className="nav-link" to={'/'} onClick={this.logout}>Log out</Link>
                    </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(HomeNavBar)
