import React, {Component} from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {getSetting} from "../settings";
import CountDisplay from "./CountDisplay";
import UsersTable from "./UsersTable";


export default class UsersInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {rows: [], isLoading: true}
    }

    componentDidMount = async () => {
        const url = "https://www.mocky.io/v2/5ed460073300005f00f7a146/users"
        /*const url = getSetting('AUTH_BASE_URL') + '/users'*/
        await axios.get(url)
            .then(res => {
                this.setState({rows: res.data, isLoading: false})
            })
    }

    render() {
        const loading = this.state.isLoading
        {
            if (loading) return (<div className="loading-screen"><h3>Loading...</h3></div>)
            else return (<div>
                <CountDisplay count = {this.state.rows.length}/>
                <UsersTable rows = {this.state.rows}/>
            </div>)
        }
    }
}