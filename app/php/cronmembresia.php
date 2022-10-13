<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Membresia.php");
require_once("clases/class.Funciones.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Membresia();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$fechaactual=date('Y-m-d').' 23:59:59';
	$membresias=$lo->ObtenerUsuariosMembresia($fechaactual);

	for ($i=0; $i < count($membresias); $i++) { 
		$lo->idusuarios_membresia=$membresias[$i]->idusuarios_membresia;
		$lo->estatus=0;
		$lo->ActualizarEstatusMembresia();
	}

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