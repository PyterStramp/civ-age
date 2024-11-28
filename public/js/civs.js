// Variables globales
let civilizations = [];
let originalOrder = [];

function renderCivilizations(filteredCivilizations) {
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

function populateFilters(civilizations) {
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

fetch("/api/civilizations")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    civilizations = data.civilizations;
    originalOrder = [...civilizations];
    populateFilters(civilizations);
    renderCivilizations(civilizations);
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

document.getElementById("filter-expansion").addEventListener("change", () => {
  const selectedExpansion = document.getElementById("filter-expansion").value;
  const selectedFocus = document.getElementById("filter-focus").value;

  document.getElementById("search-bar").value = "";

  let filteredCivilizations = civilizations;

  if (selectedExpansion) {
    filteredCivilizations = filteredCivilizations.filter(
      (civ) => civ.expansion === selectedExpansion
    );
  }

  if (selectedFocus) {
    filteredCivilizations = filteredCivilizations.filter((civ) =>
      civ.focus.includes(selectedFocus)
    );
  }

  renderCivilizations(filteredCivilizations);
});

document.getElementById("filter-focus").addEventListener("change", () => {
  const selectedExpansion = document.getElementById("filter-expansion").value;
  const selectedFocus = document.getElementById("filter-focus").value;

  document.getElementById("search-bar").value = "";

  let filteredCivilizations = civilizations;

  // Filtrar por expansión
  if (selectedExpansion) {
    filteredCivilizations = filteredCivilizations.filter(
      (civ) => civ.expansion === selectedExpansion
    );
  }

  if (selectedFocus) {
    filteredCivilizations = filteredCivilizations.filter((civ) =>
      civ.focus.includes(selectedFocus)
    );
  }

  renderCivilizations(filteredCivilizations);
});

document
  .getElementById("sort-alphabetically")
  .addEventListener("change", () => {
    const selectedExpansion = document.getElementById("filter-expansion").value;
    const selectedFocus = document.getElementById("filter-focus").value;
    const sortAlphabetically = document.getElementById(
      "sort-alphabetically"
    ).checked;
    document.getElementById("search-bar").value = "";

    let filteredCivilizations = civilizations;

    if (selectedExpansion) {
      filteredCivilizations = filteredCivilizations.filter(
        (civ) => civ.expansion === selectedExpansion
      );
    }

    if (selectedFocus) {
      filteredCivilizations = filteredCivilizations.filter((civ) =>
        civ.focus.includes(selectedFocus)
      );
    }

    if (sortAlphabetically) {
      filteredCivilizations.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filteredCivilizations = [...originalOrder];
    }
    renderCivilizations(filteredCivilizations);
  });
