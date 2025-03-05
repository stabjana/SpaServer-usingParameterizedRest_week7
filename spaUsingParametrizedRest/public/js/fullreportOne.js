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

    document.getElementById('submit').addEventListener('click', send);
}

async function send() {
    const orderId = inputField.value.trim();

    if (!orderId) {
        alert("Please enter a valid order ID");
        return;
    }

    try {
        const response = await fetch(`/fullreport/${orderId}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const customer = await response.json();

        if (!customer || !customer.customer || !customer.lines) {
            throw new Error("Invalid data structure received");
        }

        updateCustomerData(customer.customer);

        rows.replaceChildren();
        for (const product of customer.lines) {
            rows.appendChild(createRow(product));
        }
        totalSpan.textContent = customer.totalSum.toFixed(2);

    } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to fetch order details.");
    }
}

function updateCustomerData(data) {
    if (!data || !data.address) {
        console.error("Invalid customer data:", data);
        return;
    }

    customerDiv.innerHTML = `
        <p>Name: <span id="customer">${data.firstname} ${data.lastname}</span></p>
        <p>Street: <span id="street">${data.address.street}</span></p>
        <p>Postcode: <span id="postcode">${data.address.postcode}</span></p>
        <p>Country: <span id="country">${data.address.country}</span></p>`;
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
