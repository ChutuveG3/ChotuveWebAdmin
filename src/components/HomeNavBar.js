import {Link} from "react-router-dom";
import ChotuveLogoTransparent from "../ChotuveAdminSmall.png";
import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import Button from "react-bootstrap/Button";

class HomeNavBar extends Component {

    logout = () => {
        localStorage.removeItem('token')
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                  <Link className="navbar-brand" to={"/sign-in"}>
                      <img src={ChotuveLogoTransparent} alt={''}/>
                  </Link>
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
