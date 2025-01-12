const urlParams = new URLSearchParams(window.location.search);
const civilizationId = urlParams.get("id");

fetch(`/api/civilizations/${civilizationId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const civilization = data.civilization;
    console.log(civilization); // Verifica toda la estructura del objeto

    const detailsDiv = document.getElementById("civilization-details");

    // Función para manejar los posibles objetos en las propiedades
    const safeJoin = (value) => {
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object') {
          // Si es un array de objetos, extrae las propiedades 'name'
          return value.map((item) => item.name).join(", ");
        } else {
          // Si es un array simple, simplemente une sus elementos
          return value.join(", ");
        }
      }
      return value || '';  // Si no es ni array ni objeto, devuelve el valor tal cual o cadena vacía
    };

    const safeJoinDescriptions = (value) => {
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object') {
          // Si es un array de objetos, extrae las propiedades 'description'
          return value.map((item) => item.description).join(", ");
        } else {
          // Si es un array simple, simplemente une sus elementos
          return value.join(", ");
        }
      }
      return value || '';  // Si no es ni array ni objeto, devuelve el valor tal cual o cadena vacía
    };

    detailsDiv.innerHTML = `
      <img src="${civilization.img_url}" alt="${civilization.name}">
      <h2>${civilization.name}</h2>
      <p><strong>Expansión:</strong> ${civilization.expansion}</p>
      <p><strong>Focus:</strong> ${safeJoin(civilization.focus)}</p>
      <p><strong>Unidad Única:</strong> ${safeJoin(civilization.unique_unit)}</p>
      <p><strong>Descripción de Unidad:</strong> ${safeJoinDescriptions(civilization.unique_unit)}</p>
      <p><strong>Tecnologías Únicas:</strong> ${safeJoin(civilization.unique_tech)}</p>
      <p><strong>Descripción de Tecnologías:</strong> ${safeJoinDescriptions(civilization.unique_tech)}</p>
      <p><strong>Bonificaciones:</strong></p>
      <ul>
        ${safeJoin(civilization.civilization_bonus)}
      </ul>
      <p><strong>Bonificación de Equipo:</strong> ${civilization.team_bonus}</p>
    `;
  })
  .catch((err) => {
    const detailsDiv = document.getElementById("civilization-details");
    detailsDiv.innerHTML = `<p>Error al cargar los detalles de la civilización: ${err.message}</p>`;
  });
