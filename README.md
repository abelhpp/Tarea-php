# Tarea-php

El proyecto consta de una API programada en php, para crear, eliminar y editar tareas, que se encuentran en una bd phpMyAdmin.

La tabla tareas.sql se encuentra en el archivos.


En clases/conexion/config se encuntra un archivo de configuracion para conectar a la base de datos
"conexion":{
        "server":"localhost",
        "user":"root",
        "password":"",
        "database":"programacionIII",
        "port": "3306"
    }


El index.html funciona de forma independiente, tiene accedo a los datos mediante javaScript.

En script.js hay que poner la URL (la ruta donde se aloja restAPI) en la variable apiUrl

const apiUrl = 'http://localhost/restAPI.php';


