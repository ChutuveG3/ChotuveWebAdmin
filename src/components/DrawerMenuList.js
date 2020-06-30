import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, {Component} from "react";

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
                    <ListItem button onClick={this.props.navigate('home')} key={"Home"}>
                        <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                    <ListItem button onClick={this.props.navigate('users')} key={"Users"}>
                        <ListItemIcon>{<PeopleIcon/>}</ListItemIcon>
                        <ListItemText primary={"Users"}/>
                    </ListItem>
                    <ListItem button onClick={this.props.navigate('videos')} key={"Videos"}>
                        <ListItemIcon>{<VideoLibraryIcon/>}</ListItemIcon>
                        <ListItemText primary={"Videos"}/>
                    </ListItem>
                    <ListItem button onClick={this.props.navigate('log_out')} key={"LogOut"}>
                        <ListItemIcon>{<ExitToAppIcon/>}</ListItemIcon>
                        <ListItemText primary={"Log out"}/>
                    </ListItem>
                </List>
            </div>
        )
    }
}