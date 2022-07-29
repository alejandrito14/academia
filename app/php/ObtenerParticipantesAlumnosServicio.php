<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Encuesta.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$encuesta=new Encuesta();
	$encuesta->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$db->begin();

	$lo->idusuario=$_POST['id_user'];
	$idservicio=$_POST['idservicio'];
	$lo->idservicio=$idservicio;
	$participantes=$lo->obtenerUsuariosServiciosAlumnosAsignados();
	$encuesta->idservicio=$idservicio;
	$obtenerEvaluaciones=$encuesta->ObtencuestaActivosServicio();

	for ($i=0; $i <count($participantes) ; $i++) { 
			$idusuarios=$participantes[$i]->idusuarios;
			$encuesta->idusuarios=$idusuarios;
			$encuestastotal=array();
		for ($j=0; $j <count($obtenerEvaluaciones); $j++) {

			 $idencuesta=$obtenerEvaluaciones[$j]->idencuesta;
			 $encuesta->idencuesta=$idencuesta;
			 $resultado=$encuesta->UsuariosEncuesta();
			 $contestado=0;
			 if(count($resultado)>0) {
			 	$contestado=1;
			 }

			 $arrayencuesta=array('idencuesta'=>$idencuesta,'contestado'=>$contestado);

			 array_push($encuestastotal,$arrayencuesta);
				
			}

			$participantes[$i]->encuestas=$encuestastotal;
	}
	$db->commit();
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