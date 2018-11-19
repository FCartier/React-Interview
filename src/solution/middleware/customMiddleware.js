import * as actionTypes from '../actions/actionTypes';
import feed from '../feed';

function createCustomMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            switch (action.type) {
                case actionTypes.SUBSCRIBE_TO_STOCK:
                    feed.subscribe(action.symbol)
                    break;
                case actionTypes.UNSUBSCRIBE_TO_STOCK:
                    feed.unsubscribe(action.symbol)
                    break;
                default:
                    break;
            }
            return action(dispatch, getState, extraArgument);
        }

        return next(action);
    };
}

const asyncMiddleWare = createCustomMiddleware();
asyncMiddleWare.withExtraArgument = createCustomMiddleware;

export default asyncMiddleWare;