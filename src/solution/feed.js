import io from 'socket.io-client'
const socket = io('localhost:2000');

export default {
    /**
     * This will invoke the callback provided with the stocks that have been requested.
     * @param callback Callback function that will receive the stock updates.
     * @example
     * {
     *  symbol: "GM",
     *   open: 38.87 ,
     *   last: 38.66,
     *   high: 40.87,
     *   low: 28.00,
     *   change: 5
     * }
     */
    onChange: function (callback) {
        socket.on('stock', callback);
    },

    /**
     * Subscribes to a symbol. Possible values: MCD, BA, BAC, LLY, GM, GE, UAL, WMT, AAL, JPM
     * @param symbols An array of symbols (e.g. ["MCD", "BA", "BAC"]) to be watched.
     */
    subscribe: function (symbols) {
        socket.emit('join', symbols);
    },

    /**
     * Unsubscribes from a symbol.
     * @param symbol Can be either a single symbol (e.g. "MCD") or an array of symbols (e.g. ["MCD", "BA", "BAC"])
     */
    unsubscribe: function (symbol) {
        socket.emit('leave', symbol);
    }
};