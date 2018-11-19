import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
//import thunk from 'redux-thunk';
import asyncMiddleWare from '../middleware/customMiddleware';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    return createStore(
        rootReducer,
        composeEnhancer(applyMiddleware(asyncMiddleWare))
    );
}