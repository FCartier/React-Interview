import React, { Component } from "react";

export default class UnsubscribeRenderer extends Component {
    constructor(props) {
        super(props);

        this.invokeParentMethod = this.invokeParentMethod.bind(this);
    }

    invokeParentMethod() {
        this.props.context.componentParent.handleUnsubscribe(this.props.node.data.symbol)
    }

    render() {
        return (
            <span>
                <button class='ui button small' onClick={this.invokeParentMethod}>
                    Unsubscribe
                </button>
            </span>
        );
    }
};