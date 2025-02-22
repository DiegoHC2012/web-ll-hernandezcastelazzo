document.addEventListener("DOMContentLoaded", function () {
    console.log("Script cargado correctamente");

    const editButton = document.querySelector("#edit-user-button");

    if (!editButton) {
        console.error("El botón 'edit-user-button' no se encontró en el DOM.");
        return;
    }

    editButton.addEventListener("click", function(event) {
        event.preventDefault();
        alert("Editando Usuario...");

        const form = document.querySelector("#edit-user-form");
        const formData = new FormData(form);
        const token = document.querySelector("input[name='csrfmiddlewaretoken']").value;

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log("Datos que se enviarán:", JSON.stringify(data));

        fetch(USER_EDIT_URL, {
            method: 'POST',  // Cambiado de PUT a POST
            headers: {
                'X-CSRFToken': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(value => {
            console.log("Usuario actualizado:", value);
            alert("Usuario actualizado correctamente");
        })
        .catch(error => {
            console.error("Error al actualizar usuario:", error);
            alert("Error al actualizar usuario");
        });
    });
});
