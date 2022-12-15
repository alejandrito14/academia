<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$lo->idusuario=$_POST['id_user'];
	$idusuarios_servicios=$_POST['idusuarios_servicios'];
	
	$lo->idusuarios_servicios=$idusuarios_servicios;
	$obtener=$lo->ObtenerServicioAsignado();

	$idservicio=$obtener[0]->idservicio;
	$lo->idservicio=$idservicio;
	$participantes=$lo->obtenerUsuariosServiciosAsignados();
	
	$respuesta['respuesta']=$participantes;
	
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