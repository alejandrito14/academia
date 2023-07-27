<?php
/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
    /*header("Location: ../../login.php"); */ echo "login";

    exit;
}
//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Fechas.php");
require_once("../../clases/class.Usuarios.php");

require_once("../../clases/class.ServiciosAsignados.php"); 
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Membresia.php");
try
{
    
    //Declaramos objetos de clases
    $db = new MySQL();
    $f=new Funciones();
    $fechas=new Fechas();
    $usuarios=new Usuarios();
    $usuarios->db=$db;
  



    $idusuarios=$se->obtenerSesion('usuariopago');
    $usuarios->id_usuario=$idusuarios;
    $obtenerDatosFiscales=$usuarios->ObtenerUsuarioDatosFiscal();

    $respuesta['respuesta']=$obtenerDatosFiscales;
    $respuesta['iduser']=$idusuarios;
    echo json_encode($respuesta);

} catch (Exception $e) {
    $db->rollback();
    //echo "Error. ".$e;

    $array->resultado = "Error: " . $e;
    $array->msg       = "Error al ejecutar el php";
    $array->id        = '0';
    //Retornamos en formato JSON
    $myJSON = json_encode($array);
    echo $myJSON;
}
?>