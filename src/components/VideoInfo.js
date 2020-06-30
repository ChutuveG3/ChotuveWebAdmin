import React,{Component} from "react";
import {mediaApi} from "../api/axios";
import CountDisplay from "./CountDisplay";
import VideoTable from "./VideoTable";

export default class VideoInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {rows: [], isLoading: true}
    }

    componentDidMount = async () => {
        const headers = {headers: {authorization: localStorage.getItem("token")}}
        await mediaApi.get("/videos", headers)
            .then(res => {
                this.setState({rows: res.data, isLoading: false})
            }).catch(err => console.log(err))
    }

    render() {
        const loading = this.state.isLoading
        if (loading) return (<div className="loading-screen"><h3>Loading...</h3></div>)
        else return (<div>
            <CountDisplay count={this.state.rows.length} resource={'videos'}/>
            <VideoTable rows={this.state.rows}/>
        </div>)
    }
}