// Variables globales
let civilizations = [];
let originalOrder = [];

const renderCivilizations = (filteredCivilizations) => {
  const civilizationList = document.getElementById("civilization-list");
  civilizationList.innerHTML = "";

  filteredCivilizations.forEach((civ) => {
    const civCard = document.createElement("div");
    civCard.classList.add("civilization-card");
    civCard.innerHTML = `
      <img src="${civ.img_url}" alt="${civ.name}">
      <h3>${civ.name}</h3>
      <p><strong>Expansión:</strong> ${civ.expansion}</p>
      <p><strong>Focus:</strong> ${civ.focus.join(", ")}</p>
      <a href="/civilization?id=${civ.id}">Ver Detalles</a>
    `;
    civilizationList.appendChild(civCard);
  });
}

const populateFilters = (civilizations) =>{
  const expansionFilter = document.getElementById("filter-expansion");
  const focusFilter = document.getElementById("filter-focus");

  const expansions = new Set();
  const focuses = new Set();

  civilizations.forEach((civ) => {
    expansions.add(civ.expansion);
    civ.focus.forEach((f) => focuses.add(f));
  });

  expansions.forEach((expansion) => {
    const option = document.createElement("option");
    option.value = expansion;
    option.textContent = expansion;
    expansionFilter.appendChild(option);
  });

  focuses.forEach((focus) => {
    const option = document.createElement("option");
    option.value = focus;
    option.textContent = focus;
    focusFilter.appendChild(option);
  });
}

const applyFilters = () => {
  const selectedExpansion = document.getElementById("filter-expansion").value;
  const selectedFocus = document.getElementById("filter-focus").value;
  const sortAlphabetically = document.getElementById("sort-alphabetically").checked;

  document.getElementById("search-bar").value = "";

  let filteredCivilizations = civilizations;

  if (sortAlphabetically) {
    filteredCivilizations.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filteredCivilizations = originalOrder;
  }

  if (selectedExpansion) {
    filteredCivilizations = filteredCivilizations.filter(
      (civ) => civ.expansion === selectedExpansion
    );
  }

  if (selectedFocus) {
    filteredCivilizations = filteredCivilizations.filter(
      (civ) => civ.focus.includes(selectedFocus)
    );
  }

  renderCivilizations(filteredCivilizations);
}

fetch("/api/civilizations")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Verifica si la respuesta contiene el arreglo `civilizations`
    if (data.civilizations && Array.isArray(data.civilizations)) {
      civilizations = data.civilizations.map((civ) => ({
        ...civ,
        // Procesa el campo 'focus', asegurando que sea un array
        focus: civ.focus ? civ.focus.split(",").map((f) => f.trim()) : [],
        // Inicializa las demás propiedades como arrays vacíos
        unique_units: civ.unique_units ? civ.unique_units.split(",").map((u) => u.trim()) : [],
        unique_techs: civ.unique_techs ? civ.unique_techs.split(",").map((t) => t.trim()) : [],
        civilization_bonuses: civ.civilization_bonuses ? civ.civilization_bonuses.split(",").map((b) => b.trim()) : [],
      }));

      originalOrder = [...civilizations]; // Clonamos los datos originales

      // Llama a tus funciones para procesar y mostrar los datos
      populateFilters(civilizations);
      renderCivilizations(civilizations);
    } else {
      throw new Error("Los datos recibidos no tienen el formato esperado.");
    }
  })
  .catch((err) => console.error("Error al cargar las civilizaciones:", err));



document.getElementById("search-bar").addEventListener("input", (event) => {
  const searchQuery = event.target.value.toLowerCase();

  document.getElementById("filter-expansion").value = "";
  document.getElementById("filter-focus").value = "";

  const filteredCivilizations = civilizations.filter((civ) =>
    civ.name.toLowerCase().includes(searchQuery)
  );
  renderCivilizations(filteredCivilizations);
});

document.getElementById("filter-expansion").addEventListener("change", applyFilters);

document.getElementById("filter-focus").addEventListener("change", applyFilters);

document.getElementById("sort-alphabetically").addEventListener("change", applyFilters);
