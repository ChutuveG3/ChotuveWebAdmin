import React, {Component} from "react";
import {authApi} from "../api/axios";
import ServersTable from "./ServersTable";
import CountDisplay from "./CountDisplay";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Link from "@material-ui/core/Link";
import {getSetting} from "../settings";
import {Button} from "@material-ui/core";

export default class ServersInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {rows: [], isLoading: true}
    }

    componentDidMount() {
        const headers = { headers: { authorization: localStorage.getItem("token")}}
        authApi.get("/servers", headers)
            .then(res => {
                this.setState({rows: res.data.servers, isLoading: false})
            }).catch(err => console.log(err))
    }

    render() {
        if (this.state.isLoading) return (<div className="loading-screen"><h3>Loading...</h3></div>)
        else return (
            <div>
                <div className="fila">
                    <div className="stats">
                        <Link style={{textDecoration: 'none'}} href={getSetting('APP_BASE_URL')+'/status'} target="_blank" >
                            <Button
                                endIcon={<OpenInNewIcon/>}
                            >
                                <h3>Live Server Stats</h3>
                            </Button>
                        </Link>
                    </div>
                    <CountDisplay resource={'Servers'} count={this.state.rows.length}/>
                </div>
                <ServersTable rows={this.state.rows}/>
            </div>
        )
    }
}