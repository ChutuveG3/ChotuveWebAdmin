import React,{Component} from "react";
import {mediaApi} from "../api/axios";
import axios from "axios";
import ServersTable from "./ServersTable";
import {ServersRegister} from "./ServersRegister";

export default class ServersInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {rows: [], isLoading: true}
    }

    componentDidMount() {
        const headers = { headers: { authorization: localStorage.getItem("token")}}
        // authApi.get("/servers", headers)
        axios.get("https://run.mocky.io/v3/1142676f-35ff-4db7-9178-73a541b663ee/servers", headers)
            .then(res => {
                this.setState({rows: res.data, isLoading: false})
            }).catch(err => console.log(err))
    }

    render() {
        const loading = this.state.isLoading
        if (loading) return (<div className="loading-screen"><h3>Loading...</h3></div>)
        else return (
            <div>
                <ServersRegister/>
                <ServersTable rows={this.state.rows}/>
            </div>
        )
    }
}