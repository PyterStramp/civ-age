const express = require('express');
const path = require('path');
require('dotenv').config();
const rutas = require('./routes/rutas');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/', rutas);


module.exports = app;
