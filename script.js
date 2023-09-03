// Obtener una referencia a la tabla
const tablaTareas = document.getElementById("tabla-tareas");

// URL de tu API REST en PHP (misma carpeta)
const apiUrl = 'restAPI.php';


// Obtener el formulario y agregar un evento de escucha para el evento "submit"
const form = document.querySelector('form');
const mensajeDiv = document.getElementById('mensaje');

// Borra una tarea
function eliminarTarea(id){
    //Creo json para eliminar
    const tareaID = id
    const jsonData = {
        id: tareaID
    };
    realizarSolicitud("DELETE", jsonData);
    realizarGET();
}

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




//Rellenar tabla y agregar eliminar DELETE a botones
function getTareas(datos){
    // Limpiar el contenido de la tabla
    tablaTareas.innerHTML = '';

    // Iterar a través de los elementos del array y agregar filas a la tabla
    datos.forEach(item => {
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

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-danger";
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';

        // Establecer el atributo personalizado "data-id" en el botón con el valor de item.id
        deleteButton.setAttribute("data-id", item.id);

        // Agregar un evento click al botón "Eliminar" para manejar la eliminación
        deleteButton.addEventListener("click", function () {
            // Recuperar el valor de "data-id" del botón
            const id =this.getAttribute("data-id");
            eliminarTarea(id);
        });
        actionCell.appendChild(editLink);
        actionCell.appendChild(deleteButton);
    });
}


//Metodo GET
function realizarGET() {
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
        //Rellenar tabla
        getTareas(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });  
}     


//Funcion DELETE, PUT, POST
function realizarSolicitud(methods, jsonData) {
    //Metodos GET
    fetch(apiUrl, {
    method: methods,
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
            
        if(methods === "POST"){
            // Manejar el mensaje de confirmación
            mensajeDiv.textContent = 'Se creo tarea id: ' + data.result.pacienteId +'con éxito';
            mostrarMensaje();
            // Limpiar los campos del formulario
            document.querySelector('input[name="title"]').value = '';
            document.querySelector('textarea[name="description"]').value = '';
            // Establece un temporizador para llamar a la función ocultarMensaje después de 5 segundos
            setTimeout(ocultarMensaje, 5000); // 5000 milisegundos = 5 segundo
        }
        if(methods === "DELETE"){
            recargarPagina();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}
    
     

//Crear nueva tarea
function crearTarea(tarea){
    realizarSolicitud("POST", tarea);
    //recargarPagina();
    realizarGET();
}

//Enviar form con nueva tarea
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
    crearTarea(jsonData);
});

//Cuando se cargue todo el body se ejecuta
document.addEventListener("DOMContentLoaded", function () {
    realizarGET();
});
