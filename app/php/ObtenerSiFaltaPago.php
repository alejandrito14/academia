<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.NotificacionPush.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.ServiciosAsignados.php");

/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new NotificacionPush();
	$f=new Funciones();
	$asignados=new ServiciosAsignados();
	$asignados->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;


	$iduser=$_POST['iduser'];
	$asignados->idusuario=$iduser;
	$obtenerServiciosAsignados=$asignados->BuscarAsignaciones();
	$encontrado=0;
	for ($i=0; $i <count($obtenerServiciosAsignados); $i++) { 
		
		$asignados->idservicio=$obtenerServiciosAsignados[$i]->idservicio;
		$pagos=$asignados->BuscarPagos();

		if (count($pagos)==0) {
			$encontrado++;
		}

	}


	$respuesta['respuesta']=1;
	$respuesta['encontrado']=$encontrado;
	
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