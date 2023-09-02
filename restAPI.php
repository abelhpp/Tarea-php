<?php
require_once 'clases/respuestas.class.php';
require_once 'clases/tareas.class.php';

$_respuestas = new respuestas;
$_tareas = new tareas;


if($_SERVER['REQUEST_METHOD'] == "GET"){

    //Metodo post, lista de tareas
    $listaTareas = $_tareas->listaTareas($pagina);

    // Configura el encabezado HTTP para indicar que la respuesta es JSON
    header("Content-Type: application/json");

    // Convierte la lista de tareas en un arreglo asociativo y envíala como JSON
    echo json_encode($listaTareas, PDO::FETCH_ASSOC);
    
    // Establece el código de respuesta HTTP
    http_response_code(200);        
}else if($_SERVER['REQUEST_METHOD'] == "POST"){
    //recibimos los datos enviados
    $postBody = file_get_contents("php://input");
    //enviamos los datos al manejador
    $datosArray = $_tareas->post($postBody);
    //delvovemos una respuesta 
     header('Content-Type: application/json');
     if(isset($datosArray["result"]["error_id"])){
         $responseCode = $datosArray["result"]["error_id"];
         http_response_code($responseCode);
     }else{
         http_response_code(200);
     }
     echo json_encode($datosArray);
    
}else if($_SERVER['REQUEST_METHOD'] == "PUT"){
      //recibimos los datos enviados
      $postBody = file_get_contents("php://input");
      //enviamos datos al manejador
      $datosArray = $_tareas->put($postBody);
        //delvovemos una respuesta 
     header('Content-Type: application/json');
     if(isset($datosArray["result"]["error_id"])){
         $responseCode = $datosArray["result"]["error_id"];
         http_response_code($responseCode);
     }else{
         http_response_code(200);
     }
     echo json_encode($datosArray);

}else if($_SERVER['REQUEST_METHOD'] == "DELETE"){

       
        //recibimos los datos enviados
        $postBody = file_get_contents("php://input");
        //enviamos datos al manejador
        $datosArray = $_tareas->delete($postBody);
        //delvovemos una respuesta 
        header('Content-Type: application/json');
        if(isset($datosArray["result"]["error_id"])){
            $responseCode = $datosArray["result"]["error_id"];
            http_response_code($responseCode);
        }else{
            http_response_code(200);
        }
        echo json_encode($datosArray);
    }
?>