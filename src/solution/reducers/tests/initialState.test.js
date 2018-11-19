import initialState from '../initialState';

const expectedState = {
    stocks: [],
    stockUpdates: {}
};

test('initialState = expectedState', () => {
    expect(initialState).toEqual(expectedState);
});