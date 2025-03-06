// Función para mostrar toast
function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    // Forzar reflow para activar la transición
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Ocultar el toast después de 3 segundos
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 500);
    }, 3000);
}

document.getElementById("eventoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const fecha_inicio = new Date(document.getElementById("fecha_inicio").value);
    const fecha_fin = new Date(document.getElementById("fecha_fin").value);
    const localidad = document.getElementById("localidad").value;
    const token = document.querySelector("#csrf_token").value;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!name || !fecha_inicio || !fecha_fin || !localidad) {
        showToast("Todos los campos son obligatorios.", "error");
        return;
    }

    if (fecha_inicio < hoy) {
        showToast("La fecha de inicio debe ser mayor al día de hoy.", "error");
        return;
    }

    if (fecha_fin <= fecha_inicio) {
        showToast("La fecha de fin no puede ser menor o igual a la fecha de inicio.", "error");
        return;
    }

    let eventoData = {
        name: name,
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, cumque. Possimus modi impedit beatae reiciendis at, ab cupiditate. Minus explicabo omnis tempore cumque itaque quas eveniet harum unde similique! Reiciendis?",
        imagen_url: "https://img.freepik.com/foto.jpg",
        fecha_inicio: fecha_inicio.toISOString(),
        fecha_fin: fecha_fin.toISOString(),
        localidad: localidad
    };

    fetch('/crearEvento/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        },
        body: JSON.stringify(eventoData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showToast(data.error, "error");
        } else {
            showToast("Evento creado con éxito!", "success");
            document.getElementById("eventoForm").reset();
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showToast("Error al crear el evento.", "error");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    cargarEventos();
});

function cargarEventos() {
    fetch("/eventosLista/")
        .then(response => response.json())
        .then(data => {
            let tablaBody = document.getElementById("tabla-body");
            tablaBody.innerHTML = ""; // Limpiar la tabla antes de cargar nuevos datos

            data.eventos.forEach(evento => {
                let fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${evento.name}</td>
                    <td>${evento.fecha_inicio}</td>
                    <td>${evento.fecha_fin}</td>
                    <td>${evento.localidad}</td>
                    <td><button class="btn-eliminar" onclick="eliminarEvento(${evento.id})">Eliminar</button></td>
                `;

                tablaBody.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar eventos:", error));
}

function eliminarEvento(eventoId) {
    if (!confirm("¿Seguro que deseas eliminar este evento?")) return;

    fetch(`/eventosLista/eliminar/${eventoId}/`, {
        method: "POST",
        headers: {
            "X-CSRFToken": document.querySelector("#csrf_token").value,
        }
    })
    .then(response => response.json())
    .then(data => {
        showToast(data.mensaje, "success");
        cargarEventos(); // Recargar la tabla después de eliminar
    })
    .catch(error => console.error("Error al eliminar evento:", error));
}
