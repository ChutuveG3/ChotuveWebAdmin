import React, {Component} from "react";
import {authApi} from "../api/axios";

export class ServersInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            successfulPost: false,
            serverName: '',
            error: {
                serverName: ''
            }
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
                if (err.response.data.internal_code === "server_already_registered"){
                    this.setState({error:{serverName : 'A server with that name already exists'}})
                    return
                }
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
        const {successfulPost, serverName, error} = this.state

        if (successfulPost) return (<div>
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
                        className={error.serverName.length > 0 ? "is-invalid form-control" : "form-control"}
                        placeholder="Server name"
                        name='serverName'
                        value={serverName}
                        onChange={this.formValChange}
                        required
                    />
                    {error.serverName.length > 0 && (
                        <span className="invalid-feedback">{error.serverName}</span>
                    )}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
        );
    }
}