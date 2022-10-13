<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.ImagenesInformativas.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$lo->db = $db;
	$imagenesinformativas=new ImagenesInformativas();
	$imagenesinformativas->db=$db;
	$lo->idusuarios_servicios=$_POST['idusuarios_servicios'];
	$id_user=$_POST['id_user'];
	$idtipousuario=$_POST['idtipousuario'];
	$obtenerservicio=$lo->ObtenerServicioAsignado();
	$lo->idservicio=$obtenerservicio[0]->idservicio;

	$imagenesinformativas->idservicio=$lo->idservicio;
	$obtenerimagenes=$imagenesinformativas->ObtenerImagenesInformativas();


	$respuesta['imagenesinformativas']=$obtenerimagenes;
	$respuesta['respuesta']=1;
	
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