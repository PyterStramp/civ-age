document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.querySelector(".delete-link");
  const modal = document.getElementById("delete-modal");
  const confirmDelete = document.getElementById("confirm-delete");
  const cancelDelete = document.getElementById("cancel-delete");

  // Mostrar modal al hacer clic en Eliminar
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault(); // Importante para evitar navegación
    modal.style.display = "block";
  });

  // Cancelar eliminación
  cancelDelete.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar al hacer clic fuera del modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Confirmar eliminación
  confirmDelete.addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/civilizations/${civilizationId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la civilización");
      }

      alert("Civilización eliminada exitosamente");
      window.location.href = "/civilizations";
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar la civilización");
    }
  });
});
