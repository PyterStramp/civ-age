const express = require('express');
const { getCivilizations, getCivilizationById  } = require('../controllers/loadCiv');
const router = express.Router();
const path = require('path');
const fs = require('fs/promises');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/inicio.html'));
});

router.get('/civilizations', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/civilizations.html'));
});

router.get('/edit-civ', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/edit-civ.html'));
});

router.get('/create-civ', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/create-civ.html'));
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

router.put('/api/civilizations/:id', async (req, res) => {
    try {
        const civId = req.params.id;
        const jsonPath = path.join(__dirname, '../data/civilizations.json');
        const fileContent = await fs.readFile(jsonPath, 'utf8');
        const civilizations = JSON.parse(fileContent);

        // Encontrar el índice de la civilización a actualizar
        const civIndex = civilizations.findIndex(civ => civ.id === civId);

        if (civIndex === -1) {
            return res.status(404).json({ message: 'Civilización no encontrada' });
        }

        // Obtener la civilización actual para mantener el ID
        const currentCiv = civilizations[civIndex];

        // Crear el objeto actualizado asegurando que los arrays estén correctamente formados
        const updatedCiv = {
            id: currentCiv.id, // Mantener el ID original
            name: req.body.name || currentCiv.name,
            img_url: req.body.img_url || currentCiv.img_url,
            expansion: req.body.expansion || currentCiv.expansion,
            // Campos que pueden tener múltiples valores
            focus: Array.isArray(req.body.focus) ? req.body.focus : currentCiv.focus,
            unique_unit: Array.isArray(req.body.unique_unit) ? req.body.unique_unit : currentCiv.unique_unit,
            description_unit: Array.isArray(req.body.description_unit) ? req.body.description_unit : currentCiv.description_unit,
            // Campos que siempre deben tener exactamente 2 valores
            unique_tech: Array.isArray(req.body.unique_tech) && req.body.unique_tech.length === 2 
                ? req.body.unique_tech 
                : currentCiv.unique_tech,
            description_tech: Array.isArray(req.body.description_tech) && req.body.description_tech.length === 2 
                ? req.body.description_tech 
                : currentCiv.description_tech,
            // Campo que puede tener múltiples valores
            civilization_bonus: Array.isArray(req.body.civilization_bonus) 
                ? req.body.civilization_bonus 
                : currentCiv.civilization_bonus,
            // Campo único
            team_bonus: req.body.team_bonus || currentCiv.team_bonus
        };

        // Validaciones adicionales
        if (!updatedCiv.unique_tech.every(Boolean) || !updatedCiv.description_tech.every(Boolean)) {
            return res.status(400).json({ 
                message: 'Las tecnologías únicas y sus descripciones son obligatorias y deben ser dos' 
            });
        }

        if (!updatedCiv.team_bonus) {
            return res.status(400).json({ 
                message: 'La bonificación de equipo es obligatoria' 
            });
        }

        // Actualizar la civilización en el array
        civilizations[civIndex] = updatedCiv;

        // Guardar los cambios en el archivo
        await fs.writeFile(jsonPath, JSON.stringify(civilizations, null, 2));

        res.json({
            message: 'Civilización actualizada exitosamente',
            civilization: updatedCiv
        });

    } catch (error) {
        console.error('Error al actualizar civilización:', error);
        res.status(500).json({
            message: 'Error al actualizar la civilización',
            error: error.message
        });
    }
});

router.delete('/api/civilizations/:id', async (req, res) => {
    try {
        const civId = req.params.id;
        const jsonPath = path.join(__dirname, '../data/civilizations.json');
        const fileContent = await fs.readFile(jsonPath, 'utf8');
        const civilizations = JSON.parse(fileContent);

        // Encontrar el índice de la civilización a eliminar
        const civIndex = civilizations.findIndex(civ => civ.id === civId);

        if (civIndex === -1) {
            return res.status(404).json({ message: 'Civilización no encontrada' });
        }

        // Eliminar la civilización del array
        civilizations.splice(civIndex, 1);

        // Guardar el archivo actualizado
        await fs.writeFile(jsonPath, JSON.stringify(civilizations, null, 2));

        res.json({ message: 'Civilización eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar civilización:', error);
        res.status(500).json({
            message: 'Error al eliminar la civilización',
            error: error.message
        });
    }
});

module.exports = router;
