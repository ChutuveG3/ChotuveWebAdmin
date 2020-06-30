import React, {Component} from "react";
import {authApi} from "../api/axios";

export class ServersInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            successfulPost: false,
            serverName: ''
        }
    }
    postServer = e => {
        e.preventDefault()
        const options = {headers: {crossOrigin : true, withCredentials: false, authorization: localStorage.getItem('token')}}

        return authApi.post('/servers', {server: this.state.serverName}, options)
            .then(res => {
                this.setState({apiKey: res.data.api_key, successfulPost: true})
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }
    formValChange = e => {
        e.preventDefault()

        this.setState({
            [e.target.name]: e.target.value,
        })
    };
    render() {
        const serverName = this.state.serverName
        const posted = this.state.successfulPost
        if (posted) return (<div>
            <h3>This is your Api Key</h3>
            <h5 style={{wordBreak: 'break-all' , marginTop: "50px", marginBottom: "50px", color: '#167bff'}}>{this.state.apiKey}</h5>
            <p>You need to set it as an env variable for your app server</p>
        </div>)
        else return (
            <form onSubmit={this.postServer}>
                <h3>Register an App Server</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Server name"
                        name='serverName'
                        value={serverName}
                        onChange={this.formValChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
        );
    }
}