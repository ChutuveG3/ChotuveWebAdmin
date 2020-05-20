import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Home from "./../controllers/Home";
import Login from "../controllers/Login";
import Signup from "../controllers/Signup";
import {PrivateRoute} from "./PrivateRoute";

class Routes extends Component {
  render() {
    return (
        <Router >
            <div className="App">
              <Route exact path='/' render = {props => localStorage.getItem('token') ?
                    <Redirect to={{pathname: "/home"}}/> :
                    <Login {...props}/>}
              />
              <PrivateRoute exact path={"/home"} component={Home}/>
              <Route exact path="/sign-in" component={Login} />
              <Route exact path="/sign-up" component={Signup} />
            </div>
      </Router>
  );
  }
}

export default Routes;