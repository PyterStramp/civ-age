const express = require("express");
const {
  getCivilizations,
  getCivilizationById,
  updateCivilization,
  createCivilization,
  deleteCivilization,
} = require("../controllers/loadCiv");
// const {executeConsult} = require('../controllers/conection');
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/inicio.html"));
});

router.get("/civilizations", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/civilizations.html"));
});

router.get("/api/civilizations", (req, res) => {
  getCivilizations((err, results) => {
    if (err) {
      res.status(500).json({ error: "Error al obtener las civilizaciones" });
    } else {
      // Devuelve un objeto con la clave `civilizations`
      res.json({ civilizations: results });
    }
  });
});

router.get("/civilization", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/civilization.html"));
});

router.get("/api/civilizations/:id", (req, res) => {
  getCivilizationById(req.params.id, (err, civilization) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al obtener la civilización" });
    }
    if (!civilization) {
      return res.status(404).json({ message: "Civilización no encontrada" });
    }
    res.json({ civilization });
  });
});

router.post("/", async function (req, res) {
  console.log(req.body);
  try {
    // Esperamos a que la función de creación de la civilización termine
    await createCivilization(req.body);  // Aquí debes asegurarte que createCivilization sea una función que retorna una promesa o usa async/await
    res.json({ message: "Civilización creada con éxito" });
  } catch (error) {
    console.error("Error al crear la civilización:", error); // Para depurar el error
    return res.status(500).json({ error: "Error al crear la civilización" });
  }
});

router.put("/api/",async function (req, res) {
  console.log(req.body);
  try {
 // Esperamos a que la función de creación de la civilización termine
    await updateCivilization(req.body);  // Aquí debes asegurarte que createCivilization sea una función que retorna una promesa o usa async/await
    res.json({ message: "Civilización actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar la civilización:", error); // Para depurar el error
    return res.status(500).json({ error: "Error al actualizar la civilización" });
  }
});

router.delete("/api/:id", function (req, res) {
  console.log("Eliminando registro de ID",req.params.id);
  deleteCivilization(req.params.id, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al eliminar la civilización" });
    }
    res.json({ message: "Civilización eliminada con éxito" });
  });
});

module.exports = router;
