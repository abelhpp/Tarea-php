<?php
require_once "conexion/conexion.php";
require_once "respuestas.class.php";


class tareas extends conexion {

    private $table = "tareas";
    private $id = "";
    private $nombre = "";
    private $descripcion = "";
    //912bc00f049ac8464472020c5cd06759

    public function listaTareas(){
        $query = "SELECT * FROM tareas";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }

    public function post($json){
        $_respuestas = new respuestas;
        $datos = json_decode($json,true);
        $this->nombre = $datos['nombre'];
        $this->descripcion = $datos['descripcion'];
        $resp = $this->insertarTarea();
        if($resp){
            $respuesta = $_respuestas->response;
            $respuesta["result"] = array(
                "pacienteId" => $resp
            );
            return $respuesta;
        }else{
            return $_respuestas->error_500();
        }
    }


    private function insertarTarea(){
        $query = "INSERT INTO " . $this->table . " (nombre,descripcion) values('" . $this->nombre . "','" . $this->descripcion . "')"; 
        $resp = parent::nonQueryId($query);
        if($resp){
             return $resp;
        }else{
            return 0;
        }
    }
    
    public function put($json){
        $_respuestas = new respuestas;
        $datos = json_decode($json,true);

        $this->id = $datos['id'];
        if(isset($datos['nombre'])) { $this->nombre = $datos['nombre']; }
        if(isset($datos['descripcion'])) { $this->descripcion = $datos['descripcion']; }
        
        $resp = $this->modificarTarea();
        if($resp){
            $respuesta = $_respuestas->response;
            $respuesta["result"] = array(
                "pacienteId" => $this->pacienteid
            );
            return $respuesta;
        }else{
            return $_respuestas->error_500();
        }
    }


    private function modificarTarea(){
        $query = "UPDATE " . $this->table . " SET nombre ='" . $this->nombre . "',descripcion = '" . $this->descripcion . "' WHERE id = '" . $this->id . "'"; 
        $resp = parent::nonQuery($query);
        if($resp >= 1){
             return $resp;
        }else{
            return 0;
        }
    }

    public function delete($json){
        $_respuestas = new respuestas;
        $datos = json_decode($json,true);

        $this->id = $datos['id'];
        $resp = $this->eliminarTarea();
        if($resp){
            $respuesta = $_respuestas->response;
            $respuesta["result"] = array(
                "pacienteId" => $this->pacienteid
            );
        return $respuesta;
        }else{
            return $_respuestas->error_500();
        }
    }


    private function eliminarTarea(){
        $query = "DELETE FROM " . $this->table . " WHERE id= '" . $this->id . "'";
        $resp = parent::nonQuery($query);
        if($resp >= 1 ){
            return $resp;
        }else{
            return 0;
        }
    }


    private function buscarToken(){
        $query = "SELECT  TokenId,UsuarioId,Estado from usuarios_token WHERE Token = '" . $this->token . "' AND Estado = 'Activo'";
        $resp = parent::obtenerDatos($query);
        if($resp){
            return $resp;
        }else{
            return 0;
        }
    }


    private function actualizarToken($tokenid){
        $date = date("Y-m-d H:i");
        $query = "UPDATE usuarios_token SET Fecha = '$date' WHERE TokenId = '$tokenid' ";
        $resp = parent::nonQuery($query);
        if($resp >= 1){
            return $resp;
        }else{
            return 0;
        }
    }



}
?>