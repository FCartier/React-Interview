import React from "react";
import feed from "../feed";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as stockActions from '../actions/stockActions';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.symbolInput = React.createRef();
        // this.state = {
        //     stocks: ["BA", "MCD"],
        //     stockUpdates: {}
        // }
    }

    componentDidMount() {
        // feed.onChange((stock) =>
        //     this.setState(({ stockUpdates }) => ({ stockUpdates: { ...stockUpdates, [stock.symbol]: stock } }))
        // );
    }

    handleSubscribe() {
        const newSymbol = this.symbolInput.current.value;
        this.props.stockActions.subscribeStock(newSymbol);
        //feed.subscribe(newSymbol);
        // this.setState(({ stocks }) => (stocks.indexOf(newSymbol) > -1 ? stocks : { stocks: [...this.state.stocks, newSymbol] }))
    }

    handleUnsubscribe(stock) {
        // this.setState(({ stocks }) => (
        //     { stocks: stocks.filter((item) => item !== stock.symbol) })
        // );
        feed.unsubscribe(stock.symbol);
    }

    setColor(value) {
        return value > 0 ? "green-text" : "red-text";
    }

    // {
    //     { this.state.stocks
    //         .filter((stock) => this.state.stockUpdates[stock])
    //         .map((stock) => this.state.stockUpdates[stock])
    //         .map((stock) => (
    //             <tr key={stock.symbol}>
    //                 <td>{stock.symbol}</td>
    //                 <td>{stock.open}</td>
    //                 <td>{stock.high}</td>
    //                 <td>{stock.low}</td>
    //                 <td>{stock.last}</td>
    //                 <td className={this.setColor(stock.change)}>{stock.change}</td>
    //                 <td><input type="button" value="Unsubscribe" onClick={() => this.handleUnsubscribe(stock)} /></td>
    //             </tr>
    //         )) }
    // }

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
                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Table.propTypes = {
    stockActions: PropTypes.object,
    stocks: PropTypes.array
};

function mapStateToProps(state) {
    return {
        stocks: state.stocks,
        stockUpdates: state.stockUpdates
    };
}

function mapDispatchToProps(dispatch) {
    return {
        stockActions: bindActionCreators(stockActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Table);