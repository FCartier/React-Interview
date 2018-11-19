import React, {Component} from "react";

export default class ChangeRenderer extends Component {
    constructor(props) {
        super(props);
    }

    setColor(value) {
        return value > 0 ? "green-text" : "red-text";
    }

    render() {
        return (
            <td className={this.setColor(this.props.node.data.change)}>{this.props.node.data.change}</td>
        );
    }
};