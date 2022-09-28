<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once "clases/conexcion.php";
require_once "clases/class.Usuarios.php";
require_once "clases/class.Pagos.php";

try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $usu=new Usuarios();
    $pagos=new Pagos();
    $pagos->db=$db;
 
    //Enviamos la conexion a la clase
    $lo->db    = $db;
    $usu->db=$db;
    $usu->idusuarios = $_POST['idusuario'];
    //Recibimos parametros
    $pagos->idusuarios=$usu->idusuarios;
    $obtenerpagosnopagados=$pagos->ListadopagosNopagados();

    if (count($obtenerpagosnopagados)==0) {
       
       $usu->EliminarAsociacionUsuario();
       $resultado=1;
    }else{

    $resultado=0;
    }

    $respuesta['respuesta'] = $resultado;

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