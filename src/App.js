import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChotuveLogoTransparent from './ChotuveAdminSmall.png'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";

import Login from "./components/loginComponent";
import SignUp from "./components/signupComponent";
import Home from "./components/Home";

class App extends Component {
  state = {authenticated: false}

  signup = () => {this.setState({authenticated : true})}

  render() {
    return (<Router history = {history} >
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>
              <img src={ChotuveLogoTransparent}/>
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' render = {(props) => <Home {...props} isAuthed = {this.state.authenticated} />} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" render = {(props) => <SignUp {...props} onSignup = {this.signup} />} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
  }
}

export default App;