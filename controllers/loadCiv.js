const civilizations = require("../data/civilizations.json");
const { executeConsult, getConnection } = require("../controllers/conection");
const { query } = require("express");

const getCivilizations = (callback) => {
  const sql = `
      SELECT c.id, c.name, c.expansion, f.focus_name as focus, c.img_url
      FROM civilizaciones c JOIN focus f ON c.id = f.id
  `;
  const connection = getConnection();
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
  connection.end();
};

const getCivilizationById = (id, callback) => {
  const sqlCivilizacion = `
      SELECT id, name, expansion, team_bonus, img_url 
      FROM civilizaciones 
      WHERE id = ?
  `;

  const sqlFocus = `
      SELECT focus_name 
      FROM focus 
      WHERE civilizacion_id = ?
  `;

  const sqlUniqueUnits = `
      SELECT unit_name, description,id
      FROM unique_units 
      WHERE civilizacion_id = ?
  `;

  const sqlUniqueTechs = `
      SELECT tech_name, description,id
      FROM unique_techs 
      WHERE civilizacion_id = ?
  `;

  const sqlBonuses = `
      SELECT bonus 
      FROM civilization_bonuses 
      WHERE civilizacion_id = ?
  `;

  const connection = getConnection();

  connection.query(sqlCivilizacion, [id], (err, civilizacionResult) => {
    if (err) {
      console.error(err);
      callback(err, null);
      connection.end();
      return;
    }

    if (civilizacionResult.length === 0) {
      callback(new Error("Civilización no encontrada"), null);
      connection.end();
      return;
    }

    const civilizacion = civilizacionResult[0];

    // Consultar las tablas relacionadas
    connection.query(sqlFocus, [id], (err, focusResult) => {
      if (err) {
        console.error(err);
        callback(err, null);
        connection.end();
        return;
      }
      civilizacion.focus = focusResult.map((f) => f.focus_name);

      connection.query(sqlUniqueUnits, [id], (err, unitsResult) => {
        if (err) {
          console.error(err);
          callback(err, null);
          connection.end();
          return;
        }
        civilizacion.unique_unit = unitsResult.map((u) => ({
          name: u.unit_name,
          description: u.description,
          id: u.id,
        }));

        connection.query(sqlUniqueTechs, [id], (err, techsResult) => {
          if (err) {
            console.error(err);
            callback(err, null);
            connection.end();
            return;
          }
          civilizacion.unique_tech = techsResult.map((t) => ({
            name: t.tech_name,
            description: t.description,
            id: t.id,
          }));

          connection.query(sqlBonuses, [id], (err, bonusesResult) => {
            if (err) {
              console.error(err);
              callback(err, null);
              connection.end();
              return;
            }
            civilizacion.civilization_bonus = bonusesResult.map((b) => b.bonus);

            // Finalizar la conexión y retornar el resultado
            connection.end();
            callback(null, civilizacion);
          });
        });
      });
    });
  });
};
const updateCivilization = async (payload, callback) => {
  const connection = getConnection();

  const actualizarCivilizacion = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["name", "expansion", "team_bonus", "img_url"];
      let valores = columnas.map((e) => payload[e]);
      columnas = columnas.map((column) => (column += "=?"));
      valores.push(payload.civilizacion_id);
      let query = `UPDATE civilizaciones SET ${columnas} WHERE id=?`;
      console.log("Update de Civilización", query, valores);
      connection.query(query, valores, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  };

  const actualizarCivilizacionBonuses = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["bonus"];
      let valores = columnas.map((e) => payload[e][0]);
      columnas = columnas.map((column) => (column += "=?"));
      valores.push(payload.civilizacion_id);
      let query = `UPDATE civilization_bonuses SET ${columnas} WHERE civilizacion_id=?`;
      console.log("Update de civilization_bonuses", query, valores);
      connection.query(query, valores, (err, results) => {
        if (err) {
          return reject(err);
        }
        // Guardamos el id generado para usarlo después
        resolve();
      });
    });
  };

  const insertarFocus = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["focus_name"];
      let valores = columnas.map((e) => payload[e][0]);
      columnas = columnas.map((column) => (column += "=?"));
      valores.push(payload.civilizacion_id);
      let query = `UPDATE focus SET ${columnas} WHERE civilizacion_id=?`;
      console.log("Update de Focus", query, valores);
      connection.query(query, valores, (err, results) => {
        if (err) {
          return reject(err);
        }
        // Guardamos el id generado para usarlo después
        resolve();
      });
    });
  };

  const insertarTecnologiasUnicas = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["tech_name", "description"];
      let promises = [];
      payload.unique_tech.forEach((ele, i) => {
        let valores = columnas.map((e) => ele[e]);
        columnas = columnas.map((column) => (column += "=?"));
        valores.push(payload.techId[i]);
        let query = `UPDATE unique_techs SET ${columnas} WHERE id=?`;
        console.log("Insert de tecnologia", query, valores);
        let promise = new Promise((resolve, reject) => {
          connection.query(query, valores, (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });

        promises.push(promise);
      });

      // Esperar a que todas las inserciones terminen
      Promise.all(promises)
        .then(() => resolve())
        .catch(reject);
    });
  };

  const insertarUnidadesUnicas = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["unit_name", "description"];
      let promises = [];
      payload.unique_unit.forEach((ele, i) => {
        let valores = columnas.map((e) => ele[e]);
        columnas = columnas.map((column) => (column += "=?"));
        valores.push(payload.unitId[i]);
        let query = `UPDATE unique_unit SET ${columnas} WHERE id=?`;
        console.log("Insert de unidades", query, valores);
        let promise = new Promise((resolve, reject) => {
          connection.query(query, valores, (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
        promises.push(promise);
      });

      // Esperar a que todas las inserciones terminen
      Promise.all(promises)
        .then(() => resolve())
        .catch(reject);
    });
  };

  try {
    // Esperamos a que todas las inserciones se realicen en el orden correcto
    await actualizarCivilizacion(); // Inserta la civilización y obtiene el ID
    await actualizarCivilizacionBonuses(); // Inserta los bonuses
    await insertarFocus(); // Inserta los focus
    await insertarTecnologiasUnicas(); // Inserta tecnologías
    await insertarUnidadesUnicas(); // Inserta unidades

    console.log("Todos los datos insertados correctamente");
  } catch (err) {
    console.error("Error al insertar los datos:", err);
  } finally {
    // Cerramos la conexión después de que todas las inserciones se hayan completado
    connection.end();
  }
};
const createCivilization = async (payload) => {
  // Abrimos la conexión dentro de la función principal
  const connection = getConnection();

  const insertarCivilizacion = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["name", "expansion", "team_bonus", "img_url"];
      let valores = columnas.map((e) => payload[e]);
      let query = `INSERT INTO civilizaciones(${columnas}) VALUES (?, ?, ?, ?)`;

      connection.query(query, valores, (err, results) => {
        if (err) {
          return reject(err);
        }
        // Guardamos el id generado para usarlo después
        payload.civilizacion_id = results.insertId;
        resolve();
      });
    });
  };

  const insertarCivilizacionBonuses = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["civilizacion_id", "bonus"];
      let valores = columnas.map((e) => payload[e]);
      let query = `INSERT INTO civilization_bonuses(${columnas}) VALUES (?, ?)`;
      console.log("Insert de Civilization", query);
      connection.query(query, valores, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  };

  const insertarFocus = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["civilizacion_id", "focus_name"];
      let valores = columnas.map((e) => payload[e]);
      let query = `INSERT INTO focus(${columnas}) VALUES (?, ?)`;
      console.log("Insert de focus", query);
      connection.query(query, valores, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  };

  const insertarTecnologiasUnicas = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["civilizacion_id", "tech_name", "description"];
      let promises = [];

      payload.tech_name.forEach((e, i) => {
        let valores = [payload.civilizacion_id, e, payload.tech_description[i]];
        let query = `INSERT INTO unique_techs(${columnas}) VALUES (?, ?, ?)`;
        console.log("Insert de tecnologia", query, valores);
        let promise = new Promise((resolve, reject) => {
          connection.query(query, valores, (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });

        promises.push(promise);
      });

      // Esperar a que todas las inserciones terminen
      Promise.all(promises)
        .then(() => resolve())
        .catch(reject);
    });
  };

  const insertarUnidadesUnicas = () => {
    return new Promise((resolve, reject) => {
      let columnas = ["civilizacion_id", "unit_name", "description"];
      let promises = [];

      payload.unit_name.forEach((e, i) => {
        let valores = [payload.civilizacion_id, e, payload.unit_description[i]];
        let query = `INSERT INTO unique_units(${columnas}) VALUES (?, ?, ?)`;
        console.log("Insert unidad", query, valores);
        let promise = new Promise((resolve, reject) => {
          connection.query(query, valores, (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });

        promises.push(promise);
      });

      // Esperar a que todas las inserciones terminen
      Promise.all(promises)
        .then(() => resolve())
        .catch(reject);
    });
  };

  try {
    // Esperamos a que todas las inserciones se realicen en el orden correcto
    await insertarCivilizacion(); // Inserta la civilización y obtiene el ID
    await insertarCivilizacionBonuses(); // Inserta los bonuses
    await insertarFocus(); // Inserta los focus
    await insertarTecnologiasUnicas(); // Inserta tecnologías
    await insertarUnidadesUnicas(); // Inserta unidades

    console.log("Todos los datos insertados correctamente");
  } catch (err) {
    console.error("Error al insertar los datos:", err);
  } finally {
    // Cerramos la conexión después de que todas las inserciones se hayan completado
    connection.end();
  }
};
const deleteCivilization = (payload, callback) => {
  const parametros = [parseInt(payload)];
  const connection = getConnection();
  // Eliminando Bonus
  let query = `DELETE FROM civilization_bonuses WHERE civilizacion_id=?`;
  connection.query(query, parametros, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
    } else {
      console.log("Resultados de la consulta:", results);
    }
  });

  // Eliminando Focus
  query = `DELETE FROM focus WHERE civilizacion_id=?`;
  connection.query(query, parametros, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
    } else {
      console.log("Resultados de la consulta:", results);
    }
  });

  // Eliminando Tecnologías Unicas
  query = `DELETE FROM unique_techs WHERE civilizacion_id=?`;
  connection.query(query, parametros, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
    } else {
      console.log("Resultados de la consulta:", results);
    }
  });

  // Eliminando Unidades únicas
  query = `DELETE FROM unique_units WHERE civilizacion_id=?`;
  connection.query(query, parametros, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
    } else {
      console.log("Resultados de la consulta:", results);
    }
  });

  // Eliminando Civilization
  query = `DELETE FROM civilizaciones WHERE id=?`;
  connection.query(query, parametros, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
      callback(err, null);
    } else {
      console.log("Resultados de la consulta:", results);
      callback(null, results);
    }
  });
  connection.end();
};
module.exports = {
  getCivilizations,
  getCivilizationById,
  createCivilization,
  deleteCivilization,
  updateCivilization,
};
