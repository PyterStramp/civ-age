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
    const detailsDiv = document.getElementById("civilization-details");
    detailsDiv.innerHTML = `
    <img src="${civilization.img_url}" alt="${civilization.name}">
    <h2>${civilization.name}</h2>
    <p><strong>Expansión:</strong> ${civilization.expansion}</p>
    <p><strong>Focus:</strong> ${civilization.focus.join(", ")}</p>
    <p><strong>Unidad Única:</strong> ${civilization.unique_unit.join(", ")}</p>
    <p><strong>Descripción de Unidad:</strong> ${civilization.description_unit.join(
      ", "
    )}</p>
    <p><strong>Tecnologías Únicas:</strong> ${civilization.unique_tech.join(
      ", "
    )}</p>
    <p><strong>Descripción de Tecnologías:</strong> ${civilization.description_tech.join(
      ", "
    )}</p>
    <p><strong>Bonificaciones:</strong></p>
    <ul>
      ${civilization.civilization_bonus
        .map((bonus) => `<li>${bonus}</li>`)
        .join("")}
    </ul>
    <p><strong>Bonificación de Equipo:</strong> ${civilization.team_bonus}</p>
  `;
  })
  .catch((err) => {
    const detailsDiv = document.getElementById("civilization-details");
    detailsDiv.innerHTML = `<p>Error al cargar los detalles de la civilización: ${err.message}</p>`;
  });
