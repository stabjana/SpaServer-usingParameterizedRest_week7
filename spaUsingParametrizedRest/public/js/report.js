
document.addEventListener('DOMContentLoaded', init);

let inputField;
let rows;
let totalSpan;

function init() {
    inputField = document.getElementById('order-id');
    rows = document.getElementById('rows');
    totalSpan = document.getElementById('total');
}