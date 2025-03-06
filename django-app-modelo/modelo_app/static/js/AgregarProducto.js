
function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    //El toast se va después de 3 segundos
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 500);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    cargarProductos();
});

function cargarProductos() {
    fetch("/productosLista/")
        .then(response => response.json())
        .then(data => {
            let tablaBody = document.getElementById("tabla-productos-body");
            tablaBody.innerHTML = ""; //Se limpia la tabla antes de cargar nuevos datos

            data.productos.forEach(producto => {
                let fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${producto.name}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.localidad}</td>
                    <td><button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
                `;

                tablaBody.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar productos:", error));
}

document.getElementById("productoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let precio = parseFloat(document.getElementById("precio").value);
    let localidad = document.getElementById("localidad").value;
    let csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    if (!name || isNaN(precio) || precio <= 0 || !localidad) {
        showToast("Todos los campos son obligatorios y el precio debe ser mayor a 0.", "error");
        return;
    }

    let productoData = {
        name: name,
        precio: precio,
        localidad: localidad
    };

    fetch('/productosLista/crear/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(productoData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showToast(data.error, "error");
        } else {
            showToast("Producto agregado con éxito!", "success");
            document.getElementById("productoForm").reset();
            cargarProductos();
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showToast("Error al agregar el producto.", "error");
    });
});

function eliminarProducto(productoId) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    fetch(`/productosLista/eliminar/${productoId}/`, {
        method: "POST",
        headers: {
            "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value,
        }
    })
    .then(response => response.json())
    .then(data => {
        showToast(data.mensaje, "success");
        cargarProductos();
    })
    .catch(error => console.error("Error al eliminar producto:", error));
}
