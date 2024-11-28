const express = require('express');
const { getCivilizations, getCivilizationById  } = require('../controllers/loadCiv');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/inicio.html'));
});

router.get('/civilizations', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/civilizations.html'));
});

router.get('/api/civilizations', (req, res) => {
    const civilizations = getCivilizations();
    res.json({ civilizations });
});

router.get('/civilization', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/civilization.html'));
});  

router.get('/api/civilizations/:id', (req, res) => {
    const civilization = getCivilizationById(req.params.id);
    if (!civilization) {
        return res.status(404).json({ message: 'Civilización no encontrada' });
    }
    res.json({ civilization });
});

module.exports = router;
