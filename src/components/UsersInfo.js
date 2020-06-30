import React, {Component} from 'react';
import CountDisplay from "./CountDisplay";
import UsersTable from "./UsersTable";
import {authApi} from "../api/axios";


export default class UsersInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {rows: [], isLoading: true}
    }

    componentDidMount = async () => {
        const headers = { headers: { authorization: localStorage.getItem("token")}}
        await authApi.get("/users", headers)
            .then(res => {
                this.setState({rows: res.data, isLoading: false})
            }).catch(err => console.log(err))
    }

    render() {
        const loading = this.state.isLoading
        if (loading) return (<div className="loading-screen"><h3>Loading...</h3></div>)
        else return (<div>
            <CountDisplay count = {this.state.rows.length} resource = {'users'}/>
            <UsersTable rows = {this.state.rows}/>
        </div>)
    }
}