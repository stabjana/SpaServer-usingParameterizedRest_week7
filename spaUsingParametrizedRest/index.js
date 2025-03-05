'use strict'

const path = require('path');
const express = require('express');
const app = express();

const { port, host } = require('./config.json');
const fetch = require('./libraries/fetchLib');
const createFullReport = require('./libraries/reporter');
const { getAddressOfOrder } = require('./libraries/addressLibrary'); // no parameterized version

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // to serve the public web pages

const baseRestUrl = 'http://localhost:4003/api/orders';

const homePath = path.join(__dirname, 'menu.html');

app.get('/', (req, res) => res.sendFile(homePath));

app.get('/all', (req, res) =>
    fetch(baseRestUrl)
        .then(data => data.json())
        .then(result => res.json(result)));

app.get('/report/:id', (req, res) =>
    fetch(`${baseRestUrl}/${req.params.id}`)
        .then(data => data.json())
        .then(result => res.json(createFullReport(result))));

app.get('/address/:id', (req, res) =>
    fetch(`${baseRestUrl}/${req.params.id}`)
        .then(data => data.json())
        .then(result => res.json(getAddressOfOrder(result[0])))); // taking the first item of the array

app.listen(port, host,
    () => console.log(`server ${host}:${port} serving...`));