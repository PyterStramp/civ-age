const civilizations = require('../data/civilizations.json');

const getCivilizations = () => {
  return civilizations.map(civ => ({
    id: civ.id,
    name: civ.name,
    expansion: civ.expansion,
    focus: civ.focus,
    img_url: civ.img_url
  }));
};

const getCivilizationById = (id) => {
  return civilizations.find((civ) => civ.id === id);
};

module.exports = { getCivilizations, getCivilizationById };