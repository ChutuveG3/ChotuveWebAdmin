import React, {Component} from "react";

export default class CountDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {count: this.props.count, resource: this.props.resource}
    }
    render() {
        return (
            <div className="users-count">
                <h1 style={{fontSize: '400%', fontStyle: 'bold'}}>{this.state.count}</h1>
                <p>Total {this.props.resource}</p>
            </div>
        );
    }
}