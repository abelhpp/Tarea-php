<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API</title>
    <!-- BOOTSTRAP 4 -->
    <link rel="stylesheet" href="https://bootswatch.com/4/yeti/bootstrap.min.css">
    <!-- FONT AWESOEM -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
</head>
<body>
    
    <header>
        <nav class="navbar navbar-dark bg-dark">
            <div class="container">
              <a class="navbar-brand" href="index.php">Tareas  con restAPI</a>
            </div>
        </nav>    
    </header>

    <main class="container p-4">
        <div class="row">
            <div class="col-md-4">
    
            <!-- ADD TASK FORM -->
            <div class="card card-body">
                <h1>Crear Tarea</h1>
                <form action="save_task.php" method="POST">
                    <div class="form-group">
                        <input type="text" name="title" class="form-control" placeholder="Nombre" autofocus require>
                    </div>
                    <div class="form-group">
                        <textarea name="description" rows="2" class="form-control" placeholder="Escribe una descripcion" require></textarea>
                    </div>
                    <input type="submit" name="save_task" class="btn btn-success btn-block" value="Enviar">
                </form>
            </div>
            <div id="mensaje" class="alert alert-danger"></div>   
        </div>
<?php
require_once 'clases/tareas.class.php';
$tareasObj = new tareas(); // Crea una instancia de la clase tareas
$tareas = $tareasObj->listaTareas(); // Llama al método listaTareas para obtener los datos
?>
        <div class="col-md-8">
            
                       
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Obtén los datos de tu función listaTareas
                    
                    echo $tareas;
                    // Itera a través de las tareas y genera filas en la tabla
                    foreach ($tareas as $row) {
                        echo '<tr>';
                        echo '<td>' . $row['nombre'] . '</td>'; // Columna 'nombre'
                        echo '<td>' . $row['descripcion'] . '</td>'; // Columna 'descripcion'
                        echo '<td>' . $row['fecha'] . '</td>'; // Columna 'fecha'
                        echo '<td>';
                        echo '<a href="edit.php?id=' . $row['id'] . '" class="btn btn-secondary">';
                        echo '<i class="fas fa-marker"></i>';
                        echo '</a>';
                        echo '<a href="delete_task.php?id=' . $row['id'] . '" class="btn btn-danger">';
                        echo '<i class="far fa-trash-alt"></i>';
                        echo '</a>';
                        echo '</td>';
                        echo '</tr>';
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</main>

<footer class="bg-dark text-light text-center py-3">
    <div class="container">
        <p>Derechos de autor &copy; 2023 | Mi Sitio Web</p>
    </div>   
</footer>

    



<!-- SCRIPTS -->
<script src="script.js"></script>
</body></html>