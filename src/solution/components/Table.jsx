import React from "react";
import feed from "../feed";
//import Row from './Row';

class Table extends React.Component {
    constructor() {
        super();
        this.symbolInput = React.createRef();
        this.state = {
            stocks: ["BA", "MCD"],
            stockUpdates: {}
        }
    }

    componentDidMount() {
        // For testing purpose ony, reñove it before delivery
        feed.subscribe(this.state.stocks);
        feed.onChange((stock) =>
            this.setState(({ stockUpdates }) => ({ stockUpdates: { ...stockUpdates, [stock.symbol]: stock } }))
        );
    }

    handleSubscribe() {
        const newSymbol = this.symbolInput.current.value;
        feed.subscribe(newSymbol);
        this.setState(({ stocks }) => (stocks.indexOf(newSymbol) > -1 ? stocks : { stocks: [...this.state.stocks, newSymbol] }))
    }

    handleUnsubscribe(stock) {
        this.setState(({ stocks }) => (
            { stocks: stocks.filter((item) => item !== stock.symbol) })
        );
        feed.unsubscribe(stock.symbol);
    }

    setColor(value) {
        return value > 0 ? "green-text" : "red-text";
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
                                <th>Symbol</th>
                                <th>Open</th>
                                <th>High</th>
                                <th>Low</th>
                                <th>Last</th>
                                <th>Change</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.stocks
                                    .filter((stock) => this.state.stockUpdates[stock])
                                    .map((stock) => this.state.stockUpdates[stock])
                                    .map((stock) => (
                                        <tr key={stock.symbol}>
                                            <td>{stock.symbol}</td>
                                            <td>{stock.open}</td>
                                            <td>{stock.high}</td>
                                            <td>{stock.low}</td>
                                            <td>{stock.last}</td>
                                            <td className={this.setColor(stock.change)}>{stock.change}</td>
                                            <td><input type="button" value="Unsubscribe" onClick={() => this.handleUnsubscribe(stock)} /></td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Table;