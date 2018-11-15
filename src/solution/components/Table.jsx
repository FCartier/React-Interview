import React from "react";
import feed from "../feed";

class Table extends React.Component {
    constructor() {
        super();
        this.symbolInput = React.createRef();
        this.state = {
            stocks: []
        }
    }

    componentDidMount() {
        feed.onChange((stock) => console.log(stock));
    }

    handleSubscribe() {
        const newSymbol = this.symbolInput.current.value;
        feed.subscribe(newSymbol);
        this.setState({ stocks: [...this.state.stocks, newSymbol] });

    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" ref={this.symbolInput} />
                    <input type="button" value="Subscribe" onClick={() => this.handleSubscribe()} />
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Table;