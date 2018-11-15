import React from "react";

const Row = ({ stock, unsubscribe }) => (
    <tr key={stock.symbol}>
        <td>{stock.symbol}</td>
        <td>{stock.open}</td>
        <td>{stock.high}</td>
        <td>{stock.low}</td>
        <td>{stock.last}</td>
        <td>{stock.change}</td>
        <td><input type="button" value="Unsubscribe" onClick={unsubscribe(stock.symbol)}/></td>
    </tr>
);

export default Row;