import React,{Component} from "react";
import {authApi} from "../api/axios";
import ServersTable from "./ServersTable";
import CountDisplay from "./CountDisplay";

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
                <CountDisplay resource={'Servers'} count={this.state.rows.length}/>
                <ServersTable rows={this.state.rows}/>
            </div>
        )
    }
}