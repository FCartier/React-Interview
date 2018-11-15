import * as types from './actionTypes';
import feed from '../feed';

export function subscribeStock(symbol) {
    feed.subscribe(symbol);
    return {type: types.SUBSCRIBE_TO_STOCK, symbol: symbol}
}

export function unsubscribeStock(symbol) {
    feed.unsubscribe(symbol);
    return {type: types.UNSUBSCRIBE_TO_STOCK, symbol: symbol}
}

export function updateStock(stock) {
    return {type: types.UPDATE_STOCK, stock: stock}
}

