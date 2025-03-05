
document.addEventListener('DOMContentLoaded', init);

let inputField;
let rows;
let totalSpan;

function init() {
    inputField = document.getElementById('orderId');
    rows = document.getElementById('rows');
    totalSpan = document.getElementById('total');

    document.getElementById('submit').addEventListener('click', send); // dont want to reload the page thats why only init once
}

async function send() {
    const orderId = inputField.value;
    const data = await fetch(`/report/${orderId}`); // fetch from the browser
    const result = await data.json();
    console.log(result);
    rows.replaceChildren();
    for (const line of result.lines) {
        rows.appendChild(createRow(line));
    }
    totalSpan.textContent = result.totalSum;
}

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