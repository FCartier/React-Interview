import * as types from '../actionTypes';
import * as actions from '../stockActions';

const initialStock = {
    symbol: "GM",
    open: 38.87,
    last: 38.66,
    high: 40.87,
    low: 28.00,
    change: 5
}

const expectedSubscribedObject = {
    type: types.SUBSCRIBE_TO_STOCK,
    symbol: "MCD"
}

const expectedUnsubscribedObject = {
    type: types.UNSUBSCRIBE_TO_STOCK,
    symbol: "MCD"
}

const expectedUpdateObject = {
    type: types.UPDATE_STOCK,
    stock: initialStock
}

test('Subscribe action', () => {
    expect(actions.subscribeStock("MCD")).toEqual(expectedSubscribedObject);
});

test('Unsubscribe action', () => {
    expect(actions.unsubscribeStock("MCD")).toEqual(expectedUnsubscribedObject);
});

test('Update action', () => {
    expect(actions.updateStock(initialStock)).toEqual(expectedUpdateObject);
});
