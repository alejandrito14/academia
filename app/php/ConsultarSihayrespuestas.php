<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Encuesta.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Encuesta();
	$f=new Funciones();
	$lo->db=$db;
	$db->begin();


	$idencuesta=$_POST['idencuesta'];
	$idusuarioevaluacion =$_POST['idusuarioevaluacion'];
	$lo->idencuesta=$idencuesta;
	$lo->idusuarios=$idusuarioevaluacion;
	$lo->idservicio=$_POST['idservicio'];
	$encuesta=$lo->ObtenerSihayRespuestasEvaluacion();

	if (count($encuesta)>0) {
		
		$cuestion=$lo->ObtenerRespuestasEncuesta($encuesta[0]->idusuarioencuesta);
		$encuesta[0]->cuestion=$cuestion;
	}


	$db->commit();

	$respuesta['respuesta']=1;
	$respuesta['encuesta']=$encuesta;

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