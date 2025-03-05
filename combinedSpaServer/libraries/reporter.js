'use strict';
// this will return something from our order backend
// we need to make it a bit smaller for our frontend
// this is concentrating on the frontend with a simple page that gets the data from the backend

function createProductLine(product) {
    return {
        productId: product.productId,
        productname: product.productname,
        amount: product.amount,
        price: product.price,
        rowTotal: product.amount * product.price
    };
}

module.exports = function createFullReport(orders) {
    let totalSum = 0;
    const lines = [];
    if (orders.length > 0) {
        for (const product of orders[0].products) {
            const line = createProductLine(product);
            lines.push(line);
            totalSum += line.rowTotal;
        }
    }
    return {
        lines,
        totalSum
    }
}