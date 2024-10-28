// Selecciona todas las imágenes dentro del contenedor de la galería
document.querySelectorAll('main .container .row img').forEach((img) => {
    // Configura la transición para el efecto de zoom
    img.style.transition = 'transform 0.5s ease';

    // Añade el efecto de zoom al pasar el ratón
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)'; // Aumenta la escala al pasar el ratón
    });

    // Restaura el tamaño original al quitar el ratón
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)'; // Vuelve al tamaño original
    });
});
