
document.addEventListener('DOMContentLoaded', init);

let inputField;
let rows;
let totalSpan;
let customerDiv;

function init() {
    inputField = document.getElementById('orderId');
    rows = document.getElementById('rows');
    totalSpan = document.getElementById('total');
    customerDiv = document.getElementById('customerdata');

    document.getElementById('submit').addEventListener('click', send); // dont want to reload the page thats why only init once
}

async function send() {
    const orderId = inputField.value;
    const customerData = await fetch(`/address/${orderId}`);
    const customer = await customerData.json();
    if (customer.message) {
        updateCustomerData({
            firstname: '',
            lastname: '',
            address: { street: '', postcode: '', country: '' }
        });
    } else {
        updateCustomerData(customer);
    }
    const data = await fetch(`/report/${orderId}`); // fetch from the browser
    const result = await data.json();
    rows.replaceChildren();
    for (const line of result.lines) {
        rows.appendChild(createRow(line));
    }
    totalSpan.textContent = result.totalSum;
}

function updateCustomerData(data) {
    customerDiv.innerHTML = `<p>Name: <span id="customer">${data.firstname}${data.lastname}</span></p>
    <p>Street: <span id="street">${data.address.street}</span></p>
    <p>Postcode: <span id="postcode">${data.address.postcode}</span></p>
    <p>Country: <span id="country">${data.address.country}</span></p>`;
};

function createRow(product) {
    const tr = document.createElement('tr');
    tr.appendChild(createCell(product.productId));
    tr.appendChild(createCell(product.productname));
    tr.appendChild(createCell(product.amount.toFixed(2)));
    tr.appendChild(createCell(product.price.toFixed(2)));
    tr.appendChild(createCell(product.rowTotal.toFixed(2)));
    return tr;
}

function createCell(data) {
    const td = document.createElement('td');
    td.textContent = data;
    return td;
}