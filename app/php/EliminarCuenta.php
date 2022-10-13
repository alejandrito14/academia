<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once "clases/conexcion.php";
require_once "clases/class.Usuarios.php";
require_once "clases/class.Funciones.php";


try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $lo = new Usuarios();
    $f  = new Funciones();
 
    //Enviamos la conexion a la clase
    $lo->db    = $db;
   
    $idusuario = $_POST['idusuario'];
    $password=$_POST['password'];
    $usuario=$_POST['usuario'];

    //Recibimos parametros
    $lo->idusuarios=$idusuario;
    $lo->usuario=$usuario;
    $lo->clave=$password;

    $resultado=$lo->ObtenerUsuario();
    $encontrado=0;

    if (count($resultado)>0) {
        # code...
    
    if ($resultado[0]->clave==$lo->clave) {
      $encontrado=1;

      $lo->ActualizarCelRespaldo($resultado[0]->celular);
    }
}
    
    

    $respuesta['respuesta'] = 1;
    $respuesta['encontrado'] = $encontrado;
    //Retornamos en formato JSON
    $myJSON = json_encode($respuesta);
    echo $myJSON;

} catch (Exception $e) {
    //$db->rollback();
    //echo "Error. ".$e;

    $array->resultado = "Error: " . $e;
    $array->msg       = "Error al ejecutar el php";
    $array->id        = '0';
    //Retornamos en formato JSON
    $myJSON = json_encode($array);
    echo $myJSON;
}