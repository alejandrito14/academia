<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Calificacion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.ServiciosAsignados.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Calificacion();
	$f=new Funciones();
	$serviciosasignados = new ServiciosAsignados();

	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$serviciosasignados->db=$db;

	$idusuarios_servicios=$_POST['idusuarios_servicios'];

	$serviciosasignados->idusuarios_servicios=$idusuarios_servicios;
	$obtener=$serviciosasignados->ObtenerServicioAsignado();
	$idusuarios=$_POST['id_user'];
	$lo->idservicio=$obtener[0]->idservicio;
	$lo->idusuario=$idusuarios;


	$obtener=$lo->ObtenerCalificacion();

	
	
	$db->commit();

	$respuesta['respuesta']=1;
	$respuesta['calificacion']=$obtener;
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>