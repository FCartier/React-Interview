import React from "react";
import feed from "../feed";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stockActions from '../actions/stockActions';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import ChangeRenderer from "./ChangeRenderer";
import UnsubscribeRenderer from './UnsubscribeRenderer';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.symbolInput = React.createRef();
        this.state = {
            columnDefs: [
                { headerName: "Symbol", field: "symbol" },
                { headerName: "Open", field: "open" },
                { headerName: "High", field: "high" },
                { headerName: "Low", field: "low" },
                { headerName: "Last", field: "last" },
                {
                    headerName: "Change",
                    field: "change",
                    cellRenderer: "changeRenderer",
                },
                {
                    headerName: "Action",
                    field: "action",
                    cellRenderer: "unsubscribeRenderer",
                    autoHeight: true
                }
            ],
            context: { componentParent: this },
            frameworkComponents: {
                unsubscribeRenderer: UnsubscribeRenderer,
                changeRenderer: ChangeRenderer
            }
        }
    }

    componentDidMount() {
        feed.onChange((stock) => this.props.stockActions.updateStock(stock));
    }

    handleSubscribe() {
        const newSymbol = this.symbolInput.current.value;
        this.props.stockActions.subscribeStock(newSymbol);
    }

    handleUnsubscribe(stock) {
        this.props.stockActions.unsubscribeStock(stock);
    }

    customStocks() {
        return this.props.stocks
            .filter((stock) => this.props.stockUpdates[stock])
            .map((stock) => this.props.stockUpdates[stock])
    }

    render() {
        return (
            <div className='ui vertically grid centered'>
                <h1 className='ui header'>Subscribe to some stocks</h1>
                <div className='row'>
                    <div className='ui action input'>
                        <input type='text' placeholder='Search...' ref={this.symbolInput} />
                        <button className='ui button primary' onClick={() => this.handleSubscribe()}>
                            Subscribe
                    </button>
                    </div>
                </div>
                <div className='row tableRow'>
                    <div style={{ height: '50em', width: '115em' }} className="ag-theme-balham">
                        {/* Grid Definition */}
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.customStocks()}
                            enableSorting={true}
                            enableFilter={true}
                            context={this.state.context}
                            frameworkComponents={this.state.frameworkComponents}
                            rowHeight={40}
                        >
                        </AgGridReact>
                    </div>
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
        stocks: state.stockReducer.stocks,
        stockUpdates: state.stockReducer.stockUpdates
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