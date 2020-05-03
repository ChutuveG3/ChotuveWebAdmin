import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component{
render(){
    console.log(this.props.isAuthed)
    if (this.props.isAuthed){
        return(
            <div>
            <h2>Welcome to Chotuve Admin!..</h2>
            </div>
        );
    }
    else{
        return <Redirect to = "/sign-in" />
    }

 }
}
export default Home;