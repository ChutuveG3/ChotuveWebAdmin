import React, {Component} from 'react';
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
        const url = getSetting('AUTH_BASE_URL') + '/users'
        const headers = { headers: { authorization: localStorage.getItem("token")}}
        await axios.get(url, headers)
            .then(res => {
                this.setState({rows: res.data, isLoading: false})
            }).catch(err => console.log(err))
    }

    render() {
        const loading = this.state.isLoading
        if (loading) return (<div className="loading-screen"><h3>Loading...</h3></div>)
        else return (<div>
            <CountDisplay count = {this.state.rows.length}/>
            <UsersTable rows = {this.state.rows}/>
        </div>)
    }
}