const express = require('express');
const { getCivilizations, getCivilizationById  } = require('../controllers/loadCiv');
// const {executeConsult} = require('../controllers/conection');
const router = express.Router();
const path = require('path');

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

// router.get('/sql', async (req, res) => {
//     const sql = "SELECT * FROM roles";
//     try {
//         const result = await executeConsult(sql);
//         res.json(result); // Devuelve los resultados al cliente
//     } catch (error) {
//         console.error(error); // Loguea el error en la consola para depuración
//         res.status(500).json({ message: "Error ejecutando la consulta" });
//     }
// });


module.exports = router;
