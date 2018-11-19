import * as types from './actionTypes';

export const subscribeStock = symbol => ({type: types.SUBSCRIBE_TO_STOCK, symbol})
export const unsubscribeStock = symbol => ({type: types.UNSUBSCRIBE_TO_STOCK, symbol})
export const updateStock = stock => ({type: types.UPDATE_STOCK, stock})
