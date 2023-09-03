// Obtener una referencia a la tabla
const tablaTareas = document.getElementById("tabla-tareas");

// URL de tu API REST en PHP (misma carpeta)
const apiUrl = 'restAPI.php';


// Obtener el formulario y agregar un evento de escucha para el evento "submit"
const form = document.querySelector('form');
const mensajeDiv = document.getElementById('mensaje');


//Ocultar mensaje box
function ocultarMensaje() {
    mensajeDiv.style.display = 'none';
  }

// Recargar la página actual
function recargarPagina() {
  location.reload();
}

  
// Función para mostrar el mensaje nuevamente
function mostrarMensaje() {
    mensajeDiv.style.display = 'block'; // O usa 'inline', 'inline-block', u otro valor adecuado
  }



// Crear un nuevo registro
function metodoPost(){
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
          console.log(data);
          cargarTareas();
          // Manejar el mensaje de confirmación
          mensajeDiv.textContent = ' formulario se ha enviado con éxito.';
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
}

// Función cargar tabla con tareas
function cargarTareas() {
  // Realizar una solicitud GET para obtener los datos
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Limpiar el contenido de la tabla
      tablaTareas.innerHTML = '';

      // Iterar a través de los elementos del array y agregar filas a la tabla
      data.forEach(item => {
        const newRow = tablaTareas.insertRow();

        // Agregar celdas a la fila
        const nombreCell = newRow.insertCell(0);
        nombreCell.textContent = item.nombre;

        const descripcionCell = newRow.insertCell(1);
        descripcionCell.textContent = item.descripcion;

        const fechaCell = newRow.insertCell(2);
        fechaCell.textContent = item.fecha;

        const actionCell = newRow.insertCell(3);
        const editLink = document.createElement("a");
        editLink.href = `edit.php?id=${item.id}`;
        editLink.className = "btn btn-secondary";
        editLink.innerHTML = '<i class="fas fa-marker"></i>';

        const deleteLink = document.createElement("a");
        deleteLink.href = `delete_task.php?id=${item.id}`;
        deleteLink.className = "btn btn-danger";
        deleteLink.innerHTML = '<i class="far fa-trash-alt"></i>';

        actionCell.appendChild(editLink);
        actionCell.appendChild(deleteLink);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      // Puedes mostrar un mensaje de error en tu página web
      // Ejemplo: mostrarMensajeDeError(error.message);
    });
}


//Evento del formulario
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario se envíe normalmente
  metodoPost();

});



// Llamar a la función para cargar tareas cuando se inicie la página
document.addEventListener("DOMContentLoaded", function () {
  cargarTareas();
});
