import React, {Component} from "react";

export default class CountDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {count: this.props.count, resource: this.props.resource}
    }
    render() {
        return (
            <div className="count">
                <p>{this.state.resource}</p>
                <h1 style={{fontSize: '300%', fontStyle: 'bold'}}>{this.state.count}</h1>
            </div>
        );
    }
}