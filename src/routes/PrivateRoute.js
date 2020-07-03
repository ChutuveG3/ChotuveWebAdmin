import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

export class PrivateRoute extends Component{
    render() {
        return(
            <Route exact path={this.props.url} render={() => localStorage.getItem('token') ?
                this.props.view :
                <Redirect to={{pathname: "/sign-in"}}/>
            }/>
        )
    }
}