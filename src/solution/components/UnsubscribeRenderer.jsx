import React, {Component} from "react";

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
            <span><button style={{height: 20, lineHeight: 0.5}} onClick={this.invokeParentMethod} className="btn btn-info">Unsubscribe</button></span>
        );
    }
};