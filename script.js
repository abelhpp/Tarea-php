// Obtener el formulario y agregar un evento de escucha para el evento "submit"
const form = document.querySelector('form');
const mensajeDiv = document.getElementById('mensaje');

//Ocultar mensaje box
function ocultarMensaje() {
    mensajeDiv.style.display = 'none';
  }

// Función para mostrar el mensaje nuevamente
function mostrarMensaje() {
    mensajeDiv.style.display = 'block'; // O usa 'inline', 'inline-block', u otro valor adecuado
  }



form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario se envíe normalmente

  // Obtener los valores de los campos del formulario
  const title = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('textarea[name="description"]').value;

  // Construir el objeto JSON con los valores del formulario
  const jsonData = {
    nombre: title,
    descripcion: description
  };

  // URL de tu API REST en PHP (misma carpeta)
  const apiUrl = 'restAPI.php';

  // Realizar una solicitud POST
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
        // Manejar el mensaje de confirmación
        mensajeDiv.textContent = 'El formulario se ha enviado con éxito.';
        mostrarMensaje();
        // Limpiar los campos del formulario
        document.querySelector('input[name="title"]').value = '';
        document.querySelector('textarea[name="description"]').value = '';
        // Establece un temporizador para llamar a la función ocultarMensaje después de 5 segundos
        setTimeout(ocultarMensaje, 5000); // 5000 milisegundos = 5 segundos
    })
    .catch(error => {
      console.error('Error:', error);
      // Puedes mostrar un mensaje de error en tu página web
      // Ejemplo: mostrarMensajeDeError(error.message);
    });
});
