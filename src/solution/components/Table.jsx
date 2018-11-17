import React from "react";
import feed from "../feed";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as stockActions from '../actions/stockActions';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import UnsubscribeRenderer from './UnsubscribeRenderer';
import ChangeRenderer from "./ChangeRenderer";

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
            <div>
                <div>
                    <input type="text" ref={this.symbolInput} />
                    <input type="button" value="Subscribe" onClick={() => this.handleSubscribe()} />
                </div>
                <div>
                    <div style={{ height: '150px', width: '87.6rem' }} className="ag-theme-balham">
                        {/* Grid Definition */}
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.customStocks()}
                            enableSorting={true}
                            enableFilter={true}
                            context={this.state.context}
                            frameworkComponents={this.state.frameworkComponents}
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