import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import PeopleIcon from "@material-ui/icons/People";
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import React, {Component} from "react";
import {Link} from "react-router-dom";

export class DrawerMenuList extends Component {
    render() {
        return (
            <div
                className="list"
                role="presentation"
                onClick={this.props.toggleDrawer(false)}
                onKeyDown={this.props.toggleDrawer(false)}
            >
                <List>
                    <ListItem button component={Link} to={'/users'} key={"Users"}>
                        <ListItemIcon>{<PeopleIcon/>}</ListItemIcon>
                        <ListItemText primary={"Users"}/>
                    </ListItem>
                    <ListItem button component={Link} to={'/videos'} key={"Videos"}>
                        <ListItemIcon>{<VideoLibraryIcon/>}</ListItemIcon>
                        <ListItemText primary={"Videos"}/>
                    </ListItem>
                    <ListItem button component={Link} to={'/servers'} key={"LogOut"}>
                        <ListItemIcon>{<QueuePlayNextIcon/>}</ListItemIcon>
                        <ListItemText primary={"Servers"}/>
                    </ListItem>
                </List>
            </div>
        )
    }
}