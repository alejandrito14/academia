<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once "clases/conexcion.php";
require_once "clases/class.Usuarios.php";
require_once "clases/class.Funciones.php";
//require_once "clases/class.MovimientoBitacora.php";
require_once "clases/class.AltiriaSMS.php";
require_once "clases/class.phpmailer.php";
require_once "clases/emails/class.Emails.php";
//require_once("clases/class.PagConfig.php");
require_once "clases/class.ServiciosAsignados.php";

try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $lo = new ServiciosAsignados();
    $f  = new Funciones();
    $usu=new Usuarios();
 
    //Enviamos la conexion a la clase
    $lo->db    = $db;
    $usu->db=$db;
    $idusuariotutorado = $_POST['idtutorado'];
    //Recibimos parametros
    $resultado=1;
    $lo->idusuario=$idusuariotutorado;
    $buscarUsuarioServicio=$lo->buscarUsuarioServicio();


    if (count($buscarUsuarioServicio)>0) {
    	$resultado=2;
    }
    else{
    	$usu->idusuarios=$idusuariotutorado;
    	$usu->EliminarUsuarioSecundario();
    	$usu->EliminarUsuario();
    	$resultado=1;
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