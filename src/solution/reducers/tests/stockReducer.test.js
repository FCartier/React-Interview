import stockReducer from '../stockReducer';
import initialState from '../initialState';
import * as stockActions from '../../actions/stockActions';

const initialStock = {
    symbol: "GM",
    open: 38.87,
    last: 38.66,
    high: 40.87,
    low: 28.00,
    change: 5
}

const subscribeAction = stockActions.subscribeStock("MCD");
const unsubscribeAction = stockActions.unsubscribeStock("MCD");
const updateAction = stockActions.updateStock(initialStock);

const expectedState = {
    stocks: ["MCD"],
    stockUpdates: {}
};

const expectedUpdateState = {
    stocks: [],
    stockUpdates: {
        "GM" : initialStock
    }
};

test('StockReducer subscribe action', () => {
    expect(stockReducer(initialState, subscribeAction)).toEqual(expectedState);
});

test('StockReducer unsubscribe action', () => {
    expect(stockReducer(expectedState, unsubscribeAction)).toEqual(initialState);
});

test('StockReducer update action', () => {
    expect(stockReducer(initialState, updateAction)).toEqual(expectedUpdateState);
});

