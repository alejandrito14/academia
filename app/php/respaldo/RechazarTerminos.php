<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Invitacion.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$servicios = new Servicios();
	$servicios->db=$db;
	$f=new Funciones();
	$invitacion=new Invitacion();
	$invitacion->db=$db;
	
	//Enviamos la conexion a la clase
	$lo->db = $db;

	$lo->idusuarios_servicios=$_POST['idusuarios_servicios'];
	$lo->motivocancelacion=$_POST['motivocancelacion'];
	$lo->fechacancelacion=date('Y-m-d H:i:s');
	$lo->cancelacion=1;
	$lo->estatus=2;
	$lo->GuardarCancelacion();
	$obtenerservicioasignado=$lo->ObtenerServicioAsignado();
	$idservicio=$obtenerservicioasignado[0]->idservicio;
	$idusuarios=$obtenerservicioasignado[0]->idusuarios;
	$invitacion->idservicio=$idservicio;
	$invitacion->idusuarioinvitado=$idusuarios;
	$invitacion->EliminarInvitacion();

	$respuesta['respuesta']=1;
	
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	//$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>