<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Encuesta.php");
require_once("clases/class.Funciones.php");
//require_once("clases/class.MovimientoBitacora.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Encuesta();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;


	
	$lo->idservicio=$_POST['idservicio'];
	$lo->idusuarios=$_POST['idusuarioevaluacion'];
	$obtenerencuestas=$lo->ObtencuestaActivosServicio();

	for ($i=0; $i <count($obtenerencuestas) ; $i++) { 
		$idencuesta=$obtenerencuestas[$i]->idencuesta;
		$lo->idencuesta=$idencuesta;

		$obtenersiyasehacontesta=$lo->ObtenerSihayRespuestasEvaluacion();

		$obtenerencuestas[$i]->evaluado=0;

		if (count($obtenersiyasehacontesta)>0) {

			if ($obtenersiyasehacontesta[0]->estatus=1) {
				$obtenerencuestas[$i]->evaluado=1;
			}
		}
		

	}


	$respuesta['respuesta']=$obtenerencuestas;
	
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