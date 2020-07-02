import React, {Component} from "react";
import LoggedNavBar from "./LoggedNavBar";

export class HomeView extends Component{

    render() {
        return(
            <div>
                <LoggedNavBar menuAction={this.props.toggleDrawer}/>
                <div>
                    {this.props.view}
                </div>
            </div>
        )
    }
}