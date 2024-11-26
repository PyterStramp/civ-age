const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/civilizations', (req, res) => {
    res.json({ message: 'Acá estarán las civilizaciones en desarrollo.' });
});  

module.exports = app;
