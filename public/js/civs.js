// Variables globales
let civilizations = [];
let originalOrder = [];
const expansions = new Set();
const focuses = new Set();
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
    <button class="btn btn-secondary edit-btn" data-id="${
      civ.id
    }">Editar</button>
    <button class="btn btn-danger delete-btn" data-id="${
      civ.id
    }">Eliminar</button>
    `;
    civilizationList.appendChild(civCard);
  });
}
// Llenar filtros de los selects
function populateFilters(civilizations) {
  const expansionFilter = document.getElementById("filter-expansion");
  const focusFilter = document.getElementById("filter-focus");

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
// Aplicar filtros a la búsqueda
const applyFilters = () => {
  const selectedExpansion = document.getElementById("filter-expansion").value;
  const selectedFocus = document.getElementById("filter-focus").value;
  const sortAlphabetically = document.getElementById(
    "sort-alphabetically"
  ).checked;

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
    filteredCivilizations = filteredCivilizations.filter((civ) =>
      civ.focus.includes(selectedFocus)
    );
  }

  renderCivilizations(filteredCivilizations);
};
// Recibir info de la api de civilizaciones
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
        unique_units: civ.unique_units
          ? civ.unique_units.split(",").map((u) => u.trim())
          : [],
        unique_techs: civ.unique_techs
          ? civ.unique_techs.split(",").map((t) => t.trim())
          : [],
        civilization_bonuses: civ.civilization_bonuses
          ? civ.civilization_bonuses.split(",").map((b) => b.trim())
          : [],
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

// Crear Civilización por medio del modal
document
  .getElementById("sendDataButton")
  .addEventListener("click", async () => {
    const form = document.getElementById("modalForm");
    if (!form.checkValidity()) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    const data = {
      name: document.getElementById("inputName").value,
      expansion: document.getElementById("select1").value,
      focus_name: document.getElementById("select2").value,
      unit_name: document.getElementById("unidadesUnicas").value.split(","),
      unit_description: document.getElementById("unidadDescripcion").value.split(","),
      tech_name: document.getElementById("tecnologiasUnicas").value.split(","),
      tech_description: document.getElementById("tecnologiasDescripcion").value.split(","),
      bonus: document.getElementById("bonificaciones").value.split(","),
      team_bonus: document.getElementById("bonificacionEquipo").value,
      img_url: document.getElementById("imageUrl").value,
      civilizacion_id:""
    };
    console.log(data);
    fetch(`/`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert("Creado con exito");
        location.reload();
      });
  });

document.getElementById("search-bar").addEventListener("input", (event) => {
  const searchQuery = event.target.value.toLowerCase();

  document.getElementById("filter-expansion").value = "";
  document.getElementById("filter-focus").value = "";

  const filteredCivilizations = civilizations.filter((civ) =>
    civ.name.toLowerCase().includes(searchQuery)
  );
  renderCivilizations(filteredCivilizations);
});
// Llenar selects del Modal de creacion
document.getElementById("openModalButton").addEventListener("click", () => {
  // Referencias a los selects
  const select1 = document.getElementById("select1");
  const select2 = document.getElementById("select2");

  // Limpiar los selects (por si ya tienen opciones)
  select1.innerHTML = "";
  select2.innerHTML = "";

  civilizations.forEach((civ) => {
    expansions.add(civ.expansion);
    civ.focus.forEach((f) => focuses.add(f));
  });

  expansions.forEach((expansion) => {
    const option = document.createElement("option");
    option.value = expansion;
    option.textContent = expansion;
    select1.appendChild(option);
  });

  focuses.forEach((focus) => {
    const option = document.createElement("option");
    option.value = focus;
    option.textContent = focus;
    select2.appendChild(option);
  });
});

// Manejador para el botón de "Editar"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const civId = e.target.getAttribute("data-id");
    let civilization;
    fetch(`/api/civilizations/${civId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        civilization = data.civilization;
        console.log(civilization);
        // Llenar selects

        const select1 = document.getElementById("editExpansion");
        const select2 = document.getElementById("editFocus");

        // Limpiar los selects (por si ya tienen opciones)
        select1.innerHTML = "";
        select2.innerHTML = "";

        civilizations.forEach((civ) => {
          expansions.add(civ.expansion);
          civ.focus.forEach((f) => focuses.add(f));
        });

        expansions.forEach((expansion) => {
          const option = document.createElement("option");
          option.value = expansion;
          option.textContent = expansion;
          select1.appendChild(option);
        });

        focuses.forEach((focus) => {
          const option = document.createElement("option");
          option.value = focus;
          option.textContent = focus;
          select2.appendChild(option);
        });
        // Precargar datos básicos
        document.getElementById("editId").value = civilization.id;
        document.getElementById("unitId").value += civilization.unique_unit.map(e => e.id).join(",");
        document.getElementById("techId").value +=  civilization.unique_tech.map(e => e.id).join(",");
        document.getElementById("editName").value = civilization.name;
        document.getElementById("editExpansion").value = civilization.expansion;
        document.getElementById("editTeamBonus").value =
          civilization.team_bonus;
        document.getElementById("editImageUrl").value = civilization.img_url;
        document.getElementById("editFocus").value = civilization.focus[0];

        // Precargar Unidades Únicas
        const uniqueUnits = civilization.unique_unit.map(
          (unit) => `${unit.name}: ${unit.description}`
        );
        document.getElementById("editUniqueUnit").value =
          uniqueUnits.join(", ");

        // Precargar Tecnologías Únicas
        const uniqueTechs = civilization.unique_tech.map(
          (tech) => `${tech.name}: ${tech.description}`
        );
        document.getElementById("editUniqueTech").value =
          uniqueTechs.join(", ");

        // Precargar Bonificaciones
        document.getElementById("editCivilizationBonus").value =
          civilization.civilization_bonus.join(", ");

        // Abrir modal
        $("#editModal").modal("show");
      });
  }
});

// Manejador para el botón de "Eliminar"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const civId = e.target.getAttribute("data-id");
    console.log(`Eliminando civilización con id: ${civId}`);
    // Confirmar eliminación
    if (confirm("¿Está seguro de que desea eliminar esta civilización?")) {
      // Lógica para eliminar la civilización
      fetch(`/api/${civId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Civilización eliminada con éxito.");
            // Actualizar la lista de civilizaciones en la interfaz
            e.target.closest(".civilization-card").remove();
          } else {
            alert("Error al eliminar la civilización.");
          }
        })
        .catch((error) => alert("Error de red: " + error.message));
      location.reload();
    }
  }
});
// Guardar cambios al editar
document.getElementById("saveEditButton").addEventListener("click", () => {
  try {
    // Verificar la existencia de los elementos HTML y capturar valores
    const getValue = (id) => {
      const element = document.getElementById(id);
      if (!element) {
        console.error(`Elemento con id '${id}' no encontrado.`);
        return ""; // Valor predeterminado
      }
      return element.value || ""; // Devolver valor o cadena vacía
    };

    // Procesar los datos para construir el objeto
    const updatedData = {
      civilizacion_id: parseInt(getValue("editId")),
      unitId:getValue("unitId").split(",")
      .map((f) => f.trim())
      .filter(Boolean),
      techId: getValue("techId").split(",")
      .map((f) => f.trim())
      .filter(Boolean), 
      name: getValue("editName"),
      expansion: getValue("editExpansion"),
      team_bonus: getValue("editTeamBonus"),
      img_url: getValue("editImageUrl"),
      focus_name: getValue("editFocus")
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean), // Filtrar valores vacíos
      unique_unit: getValue("editUniqueUnit")
        .split(",")
        .filter((unit) => unit.includes(":")) // Validar formato correcto
        .map((unit) => {
          const [unit_name, description] = unit.split(":").map((u) => u.trim());
          return { unit_name, description };
        }),
      unique_tech: getValue("editUniqueTech")
        .split(",")
        .filter((tech) => tech.includes(":")) // Validar formato correcto
        .map((tech) => {
          const [tech_name, description] = tech.split(":").map((t) => t.trim());
          return { tech_name, description };
        }),
      bonus: getValue("editCivilizationBonus")
        .split(",")
        .map((bonus) => bonus.trim())
        .filter(Boolean), // Filtrar valores vacíos
    };

    console.log("Datos a actualizar:", updatedData);

    // Enviar los datos actualizados al servidor
    fetch(`/api/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Civilización actualizada con éxito.");
          $("#editModal").modal("hide");
          location.reload(); // Recargar la página
        } else {
          response.json().then((data) => {
            alert(
              "Error al actualizar la civilización: " +
                (data.message || "Error desconocido.")
            );
          });
        }
      })
      .catch((error) => alert("Error de red: " + error.message));
  } catch (error) {
    console.error("Error al procesar los datos:", error);
    alert("Ocurrió un error al procesar los datos. Revisa la consola.");
  }
});
document
  .getElementById("filter-expansion")
  .addEventListener("change", applyFilters);

document
  .getElementById("filter-focus")
  .addEventListener("change", applyFilters);

document
  .getElementById("sort-alphabetically")
  .addEventListener("change", applyFilters);
