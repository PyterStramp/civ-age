document.addEventListener('DOMContentLoaded', () => {
    // Función para añadir campos dinámicos
    const addDynamicField = (button) => {
        const container = button.closest(`#${button.dataset.target}-container`);
        if(!container) return;
        const template = container.querySelector(`.${button.dataset.target}-entry`);
        const newField = template.cloneNode(true);
        
        // Limpiar los valores del nuevo campo
        newField.querySelectorAll('input').forEach(input => input.value = '');
        
        container.appendChild(newField);
    };

    // Event delegation para los botones de añadir
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-button')) {
            addDynamicField(e.target);
        }
    });

    // Manejar el envío del formulario
    document.getElementById('civilization-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            // Recolectar todos los datos del formulario
            const formData = {
                name: document.getElementById('name').value,
                expansion: document.getElementById('expansion').value,
                focus: Array.from(document.querySelectorAll('.focus-input'))
                    .map(input => input.value)
                    .filter(Boolean),
                unique_unit: Array.from(document.querySelectorAll('.unit-name'))
                    .map(input => input.value)
                    .filter(Boolean),
                description_unit: Array.from(document.querySelectorAll('.unit-description'))
                    .map(input => input.value)
                    .filter(Boolean),
                unique_tech: Array.from(document.querySelectorAll('.tech-name'))
                    .map(input => input.value)
                    .filter(Boolean),
                description_tech: Array.from(document.querySelectorAll('.tech-description'))
                    .map(input => input.value)
                    .filter(Boolean),
                civilization_bonus: Array.from(document.querySelectorAll('.bonus-input'))
                    .map(input => input.value)
                    .filter(Boolean),
                team_bonus: document.getElementById('team-bonus').value,
                img_url: document.getElementById('img-url').value
            };
            console.log('FormData a enviar:', formData);
            console.log('FormData stringified:', JSON.stringify(formData));
            const response = await fetch("/api/civilizations/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Civilización creada:', result);
            
            // Redirigir a la página principal después de crear
            window.location.href = '/';
        } catch (error) {
            console.error('Error al crear la civilización:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
            alert('Error al crear la civilización: ' + error.message);
        }
    });
});

// Función para auto-expandir los textareas
const autoExpand = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
};

// Añadir event listeners a todos los textareas expandibles
document.querySelectorAll('.expandable-input').forEach(textarea => {
    // Expandir inicialmente si tiene contenido
    autoExpand(textarea);
    
    // Expandir cuando se escriba
    textarea.addEventListener('input', (e) => {
        autoExpand(e.target);
    });
});
