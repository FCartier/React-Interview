function createCustomMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }

        return next(action);
    };
}

const asyncMiddleWare = createCustomMiddleware();
asyncMiddleWare.withExtraArgument = createCustomMiddleware;

export default asyncMiddleWare;