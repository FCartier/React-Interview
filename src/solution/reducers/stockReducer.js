import initialState from './initialState';
import { SUBSCRIBE_TO_STOCK, UPDATE_STOCK, UNSUBSCRIBE_TO_STOCK } from '../actions/actionTypes';

export default function stockReducer(state = initialState, action) {
    switch (action.type) {
        case SUBSCRIBE_TO_STOCK:
            // Add the element in the stock array
            console.log('SUBSCRIBE_TO_STOCK');
            const newStock = (state.stocks.indexOf(action.symbol) > -1 ? state.stocks : [...state.stocks, action.symbol] )
            return {...state, stocks: newStock};
            break;
        case UPDATE_STOCK:
            // Update the updateStock map
            console.log('UPDATE_STOCK')
            break;
        case UNSUBSCRIBE_TO_STOCK:
            //Remove the stock
            console.log('UNSUBSCRIBE_TO_STOCK')
            break;

        default:
            return state;
    }
}