const express = require('express');
const { getCivilizations, getCivilizationById  } = require('../controllers/loadCiv');
// const {executeConsult} = require('../controllers/conection');
const router = express.Router();
const path = require('path');
const fs = require('fs/promises');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/inicio.html'));
});

router.get('/civilizations', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/civilizations.html'));
});

router.get('/api/civilizations', (req, res) => {
    getCivilizations((err, results) => {
      if (err) {
        res.status(500).json({ error: "Error al obtener las civilizaciones" });
      } else {
        // Devuelve un objeto con la clave `civilizations`
        res.json({ civilizations: results });
      }
    });
  });
  
  
  
router.get('/civilization', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/civilization.html'));
});  

router.get('/api/civilizations/:id', (req, res) => {
    getCivilizationById(req.params.id, (err, civilization) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener la civilización' });
        }
        if (!civilization) {
            return res.status(404).json({ message: 'Civilización no encontrada' });
        }
        res.json({ civilization });
    });
});
router.post('/api/civilizations/create', async (req, res) => {
    console.log('Ruta alcanzada');
    console.log('Método:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    try {
        // Leer el archivo JSON actual
        const jsonPath = path.join(__dirname, '../data/civilizations.json');
        const fileContent = await fs.readFile(jsonPath, 'utf8');
        const civilizations = JSON.parse(fileContent);
        // Encontrar el ID más alto actual
        const maxId = Math.max(...civilizations.map(civ => parseInt(civ.id)));
        const newId = (maxId + 1).toString(); // Convertir a string para mantener consistencia
        // Crear la nueva civilización con el ID asignado
        const newCivilization = {
            id: newId,
            name: req.body.name,
            expansion: req.body.expansion,
            focus: Array.isArray(req.body.focus) ? req.body.focus : [req.body.focus],
            unique_unit: Array.isArray(req.body.unique_unit) ? req.body.unique_unit : [req.body.unique_unit],
            description_unit: Array.isArray(req.body.description_unit) ? req.body.description_unit : [req.body.description_unit],
            unique_tech: Array.isArray(req.body.unique_tech) ? req.body.unique_tech : [req.body.unique_tech],
            description_tech: Array.isArray(req.body.description_tech) ? req.body.description_tech : [req.body.description_tech],
            civilization_bonus: Array.isArray(req.body.civilization_bonus) ? req.body.civilization_bonus : [req.body.civilization_bonus],
            team_bonus: req.body.team_bonus,
            img_url: req.body.img_url
        };

        // Añadir la nueva civilización al array
        civilizations.push(newCivilization);

        // Guardar el archivo actualizado
        await fs.writeFile(jsonPath, JSON.stringify(civilizations, null, 2));

        res.status(201).json({
            message: 'Civilización creada exitosamente',
            civilization: newCivilization
        });
    } catch (error) {
        console.error('Error al crear civilización:', error);
        res.status(500).json({
            message: 'Error al crear la civilización',
            error: error.message
        });
    }
});

module.exports = router;
