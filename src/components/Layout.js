import React, {Component} from "react";

export default class Layout extends Component {
    render() {
        return(
            <div className="auth-wrapper">
                  <div className="auth-inner">
                      {this.props.component}
                  </div>
            </div>
        )
    }
}