function validarFormulario(event) {
    event.preventDefault(); // Evita el envío del formulario hasta que esté validado

    // Selección de valores y elementos de error
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();

    const errorNombre = document.getElementById("errorNombre");
    const errorApellidos = document.getElementById("errorApellidos");
    const errorTelefono = document.getElementById("errorTelefono");
    const errorEmail = document.getElementById("errorEmail");

    // Expresiones regulares para la validación
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,40}$/;
    const apellidosRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{4,60}$/;
    const telefonoRegex = /^[0-9]{9}$/;
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,4}$/;

    // Variables de validación para comprobar que todo esté correcto
    let formularioValido = true;

    // Validación del campo Nombre
    if (!nombreRegex.test(nombre)) {
        errorNombre.textContent = "El nombre debe tener entre 3 y 40 letras o espacios.";
        formularioValido = false;
    } else {
        errorNombre.textContent = "";
    }

    // Validación del campo Apellidos
    if (!apellidosRegex.test(apellidos)) {
        errorApellidos.textContent = "Los apellidos deben tener entre 4 y 60 letras, además de un espacio.";
        formularioValido = false;
    } else {
        errorApellidos.textContent = "";
    }

    // Validación del campo Teléfono
    if (!telefonoRegex.test(telefono)) {
        errorTelefono.textContent = "El teléfono debe contener exactamente 9 números.";
        formularioValido = false;
    } else {
        errorTelefono.textContent = "";
    }

    // Validación del campo Email
    if (!emailRegex.test(email)) {
        errorEmail.textContent = "Introduce un correo válido, como xxxxxx@xxxxx.xxx";
        formularioValido = false;
    } else {
        errorEmail.textContent = "";
    }

    // Envío del formulario si todos los campos son válidos
    if (formularioValido) {
        alert("Formulario enviado con éxito.");
    }
}

// Función para limpiar los mensajes de error
function limpiarErrores() {
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorApellidos").textContent = "";
    document.getElementById("errorTelefono").textContent = "";
    document.getElementById("errorEmail").textContent = "";
}

// Añadir el evento para limpiar errores al hacer clic en reset
document.querySelector('button[type="reset"]').addEventListener('click', limpiarErrores);
