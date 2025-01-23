document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const civId = urlParams.get('id');

    if (!civId) {
        alert('ID de civilización no proporcionado');
        window.location.href = '/civilizations';
        return;
    }

    const createInputWithButtons = (containerType, value = '') =>{
        
        const div = document.createElement('div');
        div.className = `${containerType}-entry`;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = `${containerType}-input`;
        input.value = value;
        input.placeholder = containerType==="focus" ? "Focus" : "Bonificación"
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-button';
        removeBtn.textContent = '-';
        removeBtn.onclick = () => div.remove();

        div.appendChild(input);
        div.appendChild(removeBtn);
        return div;
    }

    const createUnitEntryWithButtons = (unitName = '', unitDesc = '') =>{
        const div = document.createElement('div');
        div.className = 'unit-entry';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'unit-name';
        nameInput.value = unitName;
        nameInput.placeholder = 'Nombre de la unidad';

        const descInput = document.createElement('input');
        descInput.type = 'text';
        descInput.className = 'unit-description';
        descInput.value = unitDesc;
        descInput.placeholder = 'Descripción de la unidad';

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-button';
        removeBtn.textContent = '-';
        removeBtn.onclick = () => div.remove();

        div.appendChild(nameInput);
        div.appendChild(descInput);
        div.appendChild(removeBtn);
        return div;
    }

    // Cargar datos existentes
    try {
        const response = await fetch(`/api/civilizations/${civId}`);
        if (!response.ok) throw new Error('Error al cargar la civilización');
        const { civilization } = await response.json();

        
        // Rellenar el formulario con los datos actuales
        document.getElementById('name').value = civilization.name;
        document.getElementById('img_url').value = civilization.img_url;
        document.getElementById('expansion').value = civilization.expansion;
        document.getElementById('team_bonus').value = civilization.team_bonus;

        // Rellenar tecnologías únicas
        document.getElementById('tech1').value = civilization.unique_tech[0];
        document.getElementById('tech2').value = civilization.unique_tech[1];
        document.getElementById('tech1_desc').value = civilization.description_tech[0];
        document.getElementById('tech2_desc').value = civilization.description_tech[1];

        // Cargar Focus
        const focusContainer = document.getElementById('focus-container');
        civilization.focus.forEach(focus => {
            focusContainer.appendChild(createInputWithButtons('focus', focus));
        });

        // Cargar Unidades Únicas
        const unitContainer = document.getElementById('unit-container');
        civilization.unique_unit.forEach((unit, index) => {
            unitContainer.appendChild(
                createUnitEntryWithButtons(unit, civilization.description_unit[index])
            );
        });

        // Cargar Bonificaciones
        const bonusContainer = document.getElementById('bonus-container');
        civilization.civilization_bonus.forEach(bonus => {
            bonusContainer.appendChild(createInputWithButtons('bonus', bonus));
        });
    } catch (error) {
        console.error('Error:', error);
    }

    // Manejar botones de añadir
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            const container = document.getElementById(`${target}-container`);
            
            if (target === 'unit') {
                container.appendChild(createUnitEntryWithButtons());
            } else {
                container.appendChild(createInputWithButtons(target));
            }
        });
    });

    document.getElementById('edit-civilization-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedData = {
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
            unique_tech: [
                document.getElementById('tech1').value,
                document.getElementById('tech2').value
            ],
            description_tech: [
                document.getElementById('tech1_desc').value,
                document.getElementById('tech2_desc').value
            ],
            civilization_bonus: Array.from(document.querySelectorAll('.bonus-input'))
                .map(input => input.value)
                .filter(Boolean),
            team_bonus: document.getElementById('team_bonus').value,
            img_url: document.getElementById('img_url').value
        };

        try {
            const response = await fetch(`/api/civilizations/${civId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) throw new Error('Error al actualizar la civilización');

            alert('Civilización actualizada exitosamente');
            window.location.href = `/civilization?id=${civId}`;
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar la civilización');
        }
    });
});