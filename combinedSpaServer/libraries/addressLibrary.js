'use strict';
// we need to have adress from a specific order : getAddressOfOrder function

/* function getAllAddresses(orders) {
    return orders.map(order => addrNoPhone(order.customer.address));
}

function getAddress(orders, firstname, lastname) {
    const foundAddr = [];
    for (const order of orders) {
        if (order.customer.firstname === firstname &&
            order.customer.lastname === lastname) {
            foundAddr.push(order.customer.address);
        }
    }
    return foundAddr;
} */

function getAddressOfOrder(order) {
    return {
        firstname: order.customer.firstname,
        lastname: order.customer.lastname, // vielleicht fehlt hier was?
    }
}

module.exports = {
    getAddressOfOrder
}

