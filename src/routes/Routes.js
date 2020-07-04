import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Login from "../controllers/Login";
import {PrivateRoute} from "./PrivateRoute";
import UsersInfo from "../components/UsersInfo";
import VideoInfo from "../components/VideoInfo";
import {ServersInfo} from "../components/ServersInfo";
import Layout from "../components/Layout";
import LoggedNavBar from "../components/LoggedNavBar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import {DrawerMenuList} from "../components/DrawerMenuList";

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ open: open });
    };
  render() {
      return (
          <Router >
              <div className="App">
                  <Route exact path={['/home/users', '/home/videos', '/home/servers']}>
                      <LoggedNavBar menuAction={this.toggleDrawer}/>
                      <div>
                          <PrivateRoute url='/home/users/' view={<UsersInfo/>} />
                          <PrivateRoute url='/home/videos/' view={<VideoInfo/>} />
                          <PrivateRoute url='/home/servers/' view={<Layout component = {<ServersInfo/>}/>} />
                      </div>
                      <SwipeableDrawer
                          className="drawer"
                          anchor={"left"}
                          open={this.state.open}
                          onClose={this.toggleDrawer(false)}
                          onOpen={this.toggleDrawer(true)}
                      >
                          <div style={{display : "flex", justifyContent: "flex-end"}}>
                              <IconButton onClick={this.toggleDrawer(false)}>
                                  <ChevronLeftIcon/>
                              </IconButton>
                          </div>
                          <Divider/>
                          <DrawerMenuList toggleDrawer={this.toggleDrawer}/>
                      </SwipeableDrawer>
                  </Route>
                  <Route exact path='/' render = { props => localStorage.getItem('token') ?
                        <Redirect to={{pathname: "/home/users"}}/> :
                        <Login {...props}/>}
                  />
                  <Route exact path="/sign-in" component={Login} />
              </div>
          </Router>
      );
  }
}

export default Routes;