import * as types from '../actionTypes';

const subscribeActionType = 'SUBSCRIBE_TO_STOCK';
const updateActionType = 'UPDATE_STOCK';
const unsubscribeActionType = 'UNSUBSCRIBE_TO_STOCK';

test('Subscribe action type', () => {
    expect(types.SUBSCRIBE_TO_STOCK).toEqual(subscribeActionType);
});

test('Update action type', () => {
    expect(types.UPDATE_STOCK).toEqual(updateActionType);
});

test('Unsubscribe action type', () => {
    expect(types.UNSUBSCRIBE_TO_STOCK).toEqual(unsubscribeActionType);
});
