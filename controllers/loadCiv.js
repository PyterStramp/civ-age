const civilizations = require('../data/civilizations.json');
const {executeConsult, getConnection} = require('../controllers/conection');

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
      SELECT unit_name, description 
      FROM unique_units 
      WHERE civilizacion_id = ?
  `;

  const sqlUniqueTechs = `
      SELECT tech_name, description 
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
          civilizacion.focus = focusResult.map(f => f.focus_name);

          connection.query(sqlUniqueUnits, [id], (err, unitsResult) => {
              if (err) {
                  console.error(err);
                  callback(err, null);
                  connection.end();
                  return;
              }
              civilizacion.unique_unit = unitsResult.map(u => ({
                  name: u.unit_name,
                  description: u.description
              }));

              connection.query(sqlUniqueTechs, [id], (err, techsResult) => {
                  if (err) {
                      console.error(err);
                      callback(err, null);
                      connection.end();
                      return;
                  }
                  civilizacion.unique_tech = techsResult.map(t => ({
                      name: t.tech_name,
                      description: t.description
                  }));

                  connection.query(sqlBonuses, [id], (err, bonusesResult) => {
                      if (err) {
                          console.error(err);
                          callback(err, null);
                          connection.end();
                          return;
                      }
                      civilizacion.civilization_bonus = bonusesResult.map(b => b.bonus);

                      // Finalizar la conexión y retornar el resultado
                      connection.end();
                      callback(null, civilizacion);
                  });
              });
          });
      });
  });
};

module.exports = { getCivilizations, getCivilizationById };