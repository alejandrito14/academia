<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Servicios.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Servicios();
	$f=new Funciones();
	$lo->db=$db;
	$db->begin();


	$lo->idservicio=$_POST['idservicio'];
	$datosservicio=$lo->ObtenerServicio();
	$cantidadmaxima=$datosservicio[0]->numeroparticipantesmax;

	$alumnos=$lo->ObtenerParticipantes(3);
	
	$cupodisponible=0;
	if (count($alumnos)>=$cantidadmaxima) {
		$cupodisponible=1;
	}


	$db->commit();

	$respuesta['respuesta']=1;
	$respuesta['cupodisponible']=$cupodisponible;
	$respuesta['limitemaximo']=$cantidadmaxima;

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