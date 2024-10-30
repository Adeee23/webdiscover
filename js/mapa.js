// Inicializamos el mapa en la ubicación central de la empresa
let map = L.map("mapa").setView([39.8544, -4.0231], 7);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Agregamos un marcador en la ubicación de la empresa
let markerEmpresa = L.marker([39.8544, -4.0231]).addTo(map).bindPopup('DISCOVER').openPopup();

// Marcador por defecto en la ubicación del cliente
let markerCliente = L.marker([38.872505, -6.971732]).addTo(map).bindPopup('MASTER D').openPopup();

// Variable para almacenar la ruta actual
let rutaActual;

// Función para geocodificar la dirección del cliente y calcular la ruta
function calcularRuta() {
    let direccionCliente = document.getElementById("direccionCliente").value;

    if (!direccionCliente) {
        alert("Por favor, introduce una dirección.");
        return;
    }

    // URL de la API de geocodificación de Nominatim para convertir la dirección en coordenadas
    let geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccionCliente)}`;

    // Hacemos una solicitud para obtener las coordenadas de la dirección
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let latCliente = data[0].lat;
                let lonCliente = data[0].lon;

                // Actualizamos el marcador del cliente a la nueva ubicación ingresada
                map.removeLayer(markerCliente); // Eliminamos el marcador anterior
                markerCliente = L.marker([latCliente, lonCliente]).addTo(map).bindPopup('Tu ubicación').openPopup();

                // Si ya hay una ruta trazada, la eliminamos
                if (rutaActual) {
                    map.removeControl(rutaActual);
                }

                // Configuramos Leaflet Routing Machine para calcular la nueva ruta
                rutaActual = L.Routing.control({
                    waypoints: [
                        L.latLng(latCliente, lonCliente),  // Coordenadas del cliente
                        L.latLng(39.8544, -4.0231)         // Coordenadas de la empresa
                    ],
                    routeWhileDragging: true
                }).addTo(map);

                // Movemos el mapa para mostrar la nueva ubicación del cliente y la ruta
                map.setView([latCliente, lonCliente], 10);
            } else {
                alert("No se pudo encontrar la ubicación. Intenta con otra dirección.");
            }
        })
        .catch(error => {
            console.error('Error al geocodificar la dirección:', error);
            alert("Hubo un error al procesar la dirección.");
        });
}
